import {
  parseMonorepoConventionalCommits,
  renderMonorepoConventionalCommits,
} from '@bscotch/workspaces'

const parsed = await parseMonorepoConventionalCommits('.', {
  types: [
    { pattern: /^fix?$/, group: 'Bug Fixes' },
    { pattern: /^feat$/, group: 'Features' },
    { pattern: /^refactor?$/, group: 'Refactor' },
    { pattern: /^build$/, group: 'Dependencies' },
    { pattern: /^docs$/, group: 'Documentation' },
  ],
})

await renderMonorepoConventionalCommits(
  parsed,
  (project, versions) => {
    if (project.isRoot || project.package.name === '@savescum/docs') return
    const title = `# Changelog - ${project.package.name}`
    const versionStrings = versions.map((version) => {
      const header = `## ${version.version} (${
        version.date.toISOString().split('T')[0]
      })`
      const groups = Object.keys(version.groups).sort()
      const sections = groups.map((group) => {
        const changes = version.groups[group]
        const commits = changes
          .map(
            (commit) =>
              `- ${commit.variables.description} ([737860e](https://github.com/jrson83/savescum/commit/${commit.log.hash}) by ${commit.log.author.name})`
          )
          .join('\n')
        return `### ${group}\n\n${commits}`
      })
      return `${header}\n\n${sections.join('\n\n')}`
    })
    return `${title}\n\nAll notable changes to this project will be documented in this file.\n
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).\n\n${versionStrings.join(
      '\n\n'
    )}`
  },
  { filename: 'CHANGELOG.md' }
)
