---
title: 'Automating GitBook translations'
description: 'Automating GitBook translations with GitHub Actions: A complete guide'
date: 2025-03-10
image: https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg
minRead: 8
author:
  name: Arthur Dufour
  avatar:
    src: avatar.jpg
    alt: Arthur Dufour
---

## Introduction

[GitBook](https://www.gitbook.com/) is a modern documentation platform that makes it easy to create, edit, and organize documentation. With its clean interface, version control, and collaboration features, it's no wonder it's become so popular among development teams.

But if you're managing documentation with GitBook and need to support multiple languages, you've probably hit a major roadblock: GitBook doesn't offer native translation capabilities. While it's fantastic for creating and managing documentation, this lack of built-in translation features can be a real headache for global teams.

In this article, I'll share a complete solution for automating GitBook translations using GitHub Actions and a custom Node.js script. As a fullstack developer who recently implemented this for my startup, I discovered that while GitBook does provide [some documentation on translation workflows](https://docs.gitbook.com/developers/getting-started/guides/use-github-actions-to-translate-gitbook-pages), it lacks the concrete implementation details you need to actually get it working.

This guide is for you if you:

- Use GitBook for documentation
- Need to maintain content in multiple languages
- Want to automate the translation process
- Have basic familiarity with GitHub Actions & Node.js

By the end, you'll have everything you need to build a fully automated system that detects changes to your primary language content and automatically translates it to your target languages.

## Defining your requirements

Before diving into implementation, you need to make two important decisions about your workflow:

1. **Translation review process**: While machine translation has improved dramatically, it's still far from perfect. You'll need to decide how translations will be reviewed and by whom. GitBook's documentation points out something crucial: when a reviewed translation exists and the source document is updated, automatic re-translation will overwrite any manual improvements made during review. Your team needs a clear process to handle these situations.

2. **Update strategy**: You must decide how to handle updates to existing content.
   For our implementation, we took a conservative approach: we only automatically translate new documents, not updates to existing ones. This preserves any manual edits made to translations but means content authors need to manually update translations when they modify the primary language version. While this approach isn't perfect for multilingual content management, it worked best for our specific needs.

You can enhance your translation process in many ways. For instance, you could just retranslate the specific phrases that changed instead of the entire file, though this would require more development work.

## Solution Overview: Automated translation workflow

The solution I'm sharing creates an automated pipeline that:

1. Detects **new files** added in your primary language
2. Translates them using a translation service (Azure Translator)
3. Creates the corresponding content in your target language spaces
4. Commits the changes back to your repository, automatically updating GitBook

Here's a diagram showing the complete workflow:
![Diagram](/articles/automating-gitbook-translations/diagram.png)

### Step 1: Setting up GitBook with GitSync

Before we can automate translations, we need to set up GitBook properly and connect it to GitHub using GitSync.

#### Creating a Collection with language Spaces

In GitBook, collections let you group related spaces together. For our translation workflow, we'll create a collection with a separate space for each language:

1. Create a new collection in GitBook
2. Create a space for your primary language (e.g., "English")
3. Create an additional space for your target language (e.g., "French")

#### Configuring GitSync

Next, we need to connect each space to our GitHub repository:

1. Go to your space settings
2. Navigate to the "Integrations" tab
3. Select "GitHub" and follow the authentication process
4. Configure the sync settings:
   - Select your account and repository
   - Choose the branch (usually "main" or "master")
   - Use the monorepo approach and specify the folder path for your language (e.g., `./en` for the "English" space, and `./fr` for the French space)

Repeat this process for your target language space, making sure it's connected to the appropriate folder in your repository.

#### Repository structure

After setting up GitSync, your repository structure should look something like this:

```
/
├── en/           # Primary language content (English)
├── fr/           # French translations
└── .github/
    └── workflows/
        └── translate.yml  # Our future GitHub Action workflow
```

This structure makes it easy to manage content for each language separately while keeping the automation in a central location.

### Step 2: Creating the GitHub Action workflow

Now, let's create the GitHub Action workflow that will detect changes and trigger our translation process.

Create a file at `.github/workflows/translate.yml` with the following content:

```yaml
name: Translate GitBook Content

inputs:
  source_language:
    description: 'The source language (e.g.: en)'
    required: true
  target_language:
    description: 'The target language (e.g.: fr)'
    required: true
  translator_api_key:
    description: The Azure Translator API key
    required: true

runs:
  using: composite
  steps:
    - name: Get all changed markdown files
      id: changed-markdown-files
      uses: tj-actions/changed-files@v45
      with:
        files: |
          ${{ inputs.source_language }}/**/*.md

    - name: Get all changes in .gitbook/
      id: changed-gitbook-files
      uses: tj-actions/changed-files@v45
      with:
        files: |
          ${{ inputs.source_language }}/.gitbook/**

    - name: Copy .gitbook files to target language directory
      shell: bash
      if: steps.changed-gitbook-files.outputs.any_changed == 'true'
      run: |
        rm -rf ${{ inputs.target_language }}/.gitbook
        mkdir -p ${{ inputs.target_language }}/.gitbook
        cp -r ${{ inputs.source_language }}/.gitbook/* ${{ inputs.target_language }}/.gitbook/

    - name: Setup Node.js
      if: steps.changed-markdown-files.outputs.any_changed == 'true'
      uses: actions/setup-node@v4
      with:
        node-version: 23.6.0

    - name: Set up pnpm
      if: steps.changed-markdown-files.outputs.any_changed == 'true'
      uses: pnpm/action-setup@v4
      with:
        version: 9.14.2

    - name: Install dependencies
      shell: bash
      if: steps.changed-markdown-files.outputs.any_changed == 'true'
      working-directory: 365talents-actions/actions/gitbook-translator/translator-script
      run: pnpm install

    - name: Run translation script
      shell: bash
      if: steps.changed-markdown-files.outputs.any_changed == 'true'
      working-directory: 365talents-actions/actions/gitbook-translator/translator-script
      env:
        SOURCE_LANGUAGE: ${{ inputs.source_language }}
        TARGET_LANGUAGE: ${{ inputs.target_language }}
        NEW_FILES: ${{ steps.changed-markdown-files.outputs.all_changed_files }}
        TRANSLATOR_API_KEY: ${{ inputs.translator_api_key }}
      run: node index.ts

    # Make sure that deleting a file in the source_language also deletes it in target_language
    - name: Cleanup deleted files
      shell: bash
      run: |
        cd ${{ inputs.target_language }}
        find . -type f -name "*.md" | while read file; do
          if [ ! -f "../${{ inputs.source_language }}/$file" ]; then
            rm "$file"
            echo "Removed ${{ inputs.target_language }}/$file as it no longer exists in ${{ inputs.source_language }}/"
          fi
        done

    # Commit translated content
    - name: Commit changes
      uses: stefanzweifel/git-auto-commit-action@v5
      with:
        commit_message: Translate files
        file_pattern: '${{ inputs.target_language }}/**'
        add_options: --all
```

This workflow:

1. Triggers on file changes
2. Uses tj-actions/changed-files to detect which files have changed
3. Checks out the repository and sets up Node.js
4. Runs our translation script (which we'll create next)
5. Commits the translated files back to the repository

### Step 3: Implementing the translation script

Now we need to develop the Node.js script that will perform the actual translation work. This script is the heart of our automation system, responsible for:

1. Processing the detected file changes
2. Communicating with the translation API
3. Saving the translated content

I've created a complete implementation of this translation script and shared it in a GitHub Gist for you to reference: [GitBook Translation Script](https://gist.github.com/adufr/64635aadcb3c94a45d0e9d7fde06bc41)

The script uses Azure Translator API to convert content between languages, but you can easily modify it to work with other translation services like DeepL, Google Cloud Translation, or OpenAI if those better suit your needs.

> One critical aspect of the translation script is how it handles Markdown syntax. The Azure Translator API sometimes loses Markdown formatting during translation. To fix this, the script uses regular expressions and string replacements to preserve all Markdown syntax elements after translation.

Remember that this implementation reflects my team's specific requirements and workflow. You should review and customize the code to match your team's translation strategy, especially regarding how you want to handle content updates and translation reviews.

### Step 4: Committing translated content back to the repository

The GitHub Action workflow automatically commits the translated files back to your repository. GitSync then updates your GitBook spaces with the new content. You have nothing more to do! 😄

## Advanced Customizations

### Supporting multiple target languages

My script currently only supports one target language, but it can easily be adapted to handle multiple target languages.

You would need to:

- Add more GitBook spaces and configure GitSync correctly for each language
- Update the translation script to loop through all target languages
- Modify the GitHub Action to support multiple target languages

### Implementing manual review workflows

Currently, the described setup doesn't include a manual review process, meaning all new files are automatically translated and instantly added to GitBook.

To implement a manual review process, you could:

1. Create a pull request instead of directly committing translations
2. Add reviewers to the pull request
3. Only merge after approval

### Optimizing for large content bases

Our setup only translates new files, which isn't ideal for frequently updated documentation. If you regularly make changes to your documentation, you'd need to implement incremental translation to process only the content that has changed.

### Translation quality considerations

Azure Translator, like other machine translation services, works well for most general content but may struggle with:

- Technical terminology specific to your product or industry
- Complex sentence structures
- Idiomatic expressions
- Cultural nuances

For technical documentation, you might notice certain specialized terms being translated incorrectly or inconsistently across documents.

Beyond manual review, here are several strategies to enhance your translation quality:

1. **Custom Dictionary/Glossary**: Create a glossary of technical terms and their approved translations. Some translation APIs (including Azure Translator with Custom Translator) allow you to provide custom dictionaries.
2. **Pre-processing Content**: Simplify complex sentences in your source content. Clear, concise writing translates better.
3. **Post-processing Scripts**: Develop scripts that automatically correct known translation issues, such as consistently replacing certain terms with their correct translations.
4. **Translation Memory**: Implement a translation memory system that stores previously approved translations, allowing you to reuse them for similar content.

### Cost considerations

When implementing an automated translation system, it's important to consider the costs involved, especially as your documentation grows.

A few things to keep in mind:

- Compare service costs before committing to one provider
- Implement cost optimization strategies (only translate sections that have changed, store and reuse translations for repeated content)
- Monitor your usage and set up alerts to avoid unexpected costs as your documentation grows

## Conclusion

Setting up this GitBook translation system was honestly not that simple to do. GitBook really should just build this in. In my opinion, documentation is global, and teams shouldn't have to hack together custom solutions for something so fundamental.

Until then, this solution works well enough to save you from manual translation headaches. It's not perfect, but it's definitely better than copying and pasting content between languages!
