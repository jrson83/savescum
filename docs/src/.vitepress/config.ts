import { version } from '../../../packages/savescum/package.json'
import { generateSitemap as sitemap } from 'sitemap-ts'
import { defineConfig } from 'vitepress'

const github = 'https://github.com/jrson83/savescum'

export default defineConfig({
  lang: 'en-US',
  title: 'savescum',
  description:
    'A command-line tool & webinterface, to efficiently save scum on a jailbroken PS4.',
  lastUpdated: true,
  outDir: '../dist',
  cleanUrls: true,
  themeConfig: {
    /* outline: [2, 3], */
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '/guide/',
      },
      {
        text: 'CLI',
        link: '/cli/',
        activeMatch: '/cli/',
      },
      {
        text: 'Webinterface',
        link: '/webinterface/',
        activeMatch: '/webinterface/',
      },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes ',
            link: `${github}/releases`,
          },
          {
            text: 'Changelog',
            link: `${github}/blob/main/CHANGELOG.md`,
          },
          {
            text: 'Contributing ',
            link: `${github}/blob/main/CONTRIBUTING.md`,
          },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: github }],
    sidebar: {
      '/': [
        {
          text: 'Getting started',
          items: [
            {
              text: 'Introduction',
              link: '/guide/',
            },
            {
              text: 'Why savescum?',
              link: '/guide/why-savescum',
            },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Preperation', link: '/guide/preperation' },
          ],
        },
        {
          text: 'CLI',
          items: [
            { text: 'Overview', link: '/cli/' },
            { text: 'Command Reference', link: '/cli/commands' },
          ],
        },
        {
          text: 'Webinterface',
          items: [
            { text: 'Overview', link: '/webinterface/' },
            { text: 'Configuration', link: '/webinterface/configuration' },
          ],
        },
      ],
    },
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: `Released under the <a href="${github}/blob/main/LICENSE">MIT License</a>.`,
      copyright: 'Copyright © 2022-present jrson83.',
    },
  },
  buildEnd() {
    sitemap({ hostname: 'http://127.0.0.1:5173/' })
  },
})
