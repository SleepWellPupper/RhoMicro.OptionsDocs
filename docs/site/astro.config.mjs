// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeSlugify from '@microflash/rehype-slugify'
import {slugifyWithCounter} from '@sindresorhus/slugify'
import starlightLinksValidator from 'starlight-links-validator'
import starlightLlmsTxt from 'starlight-llms-txt'

const slugify = slugifyWithCounter()
const slugifyOptions = {
    separator: '-',
    lowercase: true,
    decamelize: false,
    customReplacements: [
        ['<', '_'],
        ['>', '_'],
        ['(', '_'],
        [')', '_'],
        [' ', '_'],
        [',', ''],
        ['.', '_'],
        ['__', '_']
    ],
    preserveLeadingUnderscore: false,
    preserveTrailingDash: false,
    preserveCharacters: ['_']
}

// https://astro.build/config
export default defineConfig({
    site: 'https://bindsight.rhomicro.com',
    markdown: {
        rehypePlugins: [
            [rehypeSlugify, {
                reset() {
                    slugify.reset()
                },
                slugify(text) {
                    return slugify(text, slugifyOptions).replace(/_+$/, "")
                }
            }]
        ],
    },
    integrations: [
        starlight({
            title: 'BindSight',
            plugins: [
                starlightLinksValidator(),
                starlightLlmsTxt(),
            ],
            tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/sleepwellpupper/RhoMicro.BindSight'
                }
            ],
            sidebar: [
                {
                    label: 'Tutorials',
                    autogenerate: {directory: 'tutorials'},
                },
                // {
                // 	label: 'Guides',
                // 	autogenerate: { directory: 'guides' },
                // },
                {
                    label: 'Explanations',
                    autogenerate: {directory: 'explanations'}
                },
                {
                    label: 'Reference',
                    autogenerate: {directory: 'reference'},
                },
            ], customCss: [
                // Relative path to your custom CSS file
                './src/styles/custom.css',
            ],
        }),
    ],
});
