export default function (plop) {
  const transformName = (str) => {
    return str.toLowerCase().replace(/ /g, '-')
  }

  // create your generators here
  plop.setGenerator('example', {
    description: 'new example in repo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Example name: ',
      },
      {
        type: 'list',
        name: 'exampleScopeFolder',
        message: 'Scope (Example folder): ',
        choices: [
          { name: 'App directory', value: 'app-directory' },
          { name: 'Edge Functions', value: 'edge-functions' },
          { name: 'Edge Middleware', value: 'edge-middleware' },
          { name: 'Solutions', value: 'solutions' },
          { name: 'Starter', value: 'starter' },
        ],
      },
      {
        type: 'checkbox',
        name: 'options',
        message: 'What options do you like?',
        choices: [
          {
            name: 'Basic example',
            value: 'basic',
            checked: true,
          },
          {
            name: 'Next.js API Routes - Serverless Functions',
            value: 'serverless-functions',
          },
          {
            name: 'Next.js API Routes - Edge Functions',
            value: 'edge-functions',
          },
          { name: 'Next.js Edge Middleware', value: 'edge-middleware' },
        ],
      },
    ],
    actions: (data) => {
      const plopExampleName = transformName(data.name)
      const plopPath = `${data.exampleScopeFolder}/${plopExampleName}`

      const filesToAlwaysCopyOver = [
        'README.md',
        'tsconfig.json',
        '.eslintrc.json',
        '.gitignore',
        'next-env.d.ts',
        'package.json',
        'pages/index.tsx',
        'pages/_app.tsx',
        'postcss.config.js',
        'tailwind.config.js',
        'public/favicon.ico',
      ]

      const actions = []

      // Copy over basic files
      filesToAlwaysCopyOver.forEach((file) => {
        actions.push({
          type: 'add',
          path: `{{exampleScopeFolder}}/${plopExampleName}/${file}`,
          templateFile: `plop-templates/example/${file}`,
        })
      })

      // modify _app.tsx
      actions.push({
        type: 'modify',
        path: `{{exampleScopeFolder}}/${plopExampleName}/pages/_app.tsx`,
        pattern: /(-- PLOP PATH HERE --)/gi,
        template: `${plopPath}`,
      })
      actions.push({
        type: 'modify',
        path: `{{exampleScopeFolder}}/${plopExampleName}/pages/_app.tsx`,
        pattern: /(-- PLOP TITLE HERE --)/gi,
        template: `${data.name}`,
      })

      if (data.options.includes('serverless-functions')) {
        actions.push({
          type: 'add',
          path: `{{exampleScopeFolder}}/${plopExampleName}/pages/api/hello.ts`,
          templateFile: `plop-templates/example/pages/api/hello.ts`,
        })
      }

      if (data.options.includes('edge-functions')) {
        actions.push({
          type: 'add',
          path: `{{exampleScopeFolder}}/${plopExampleName}/pages/api/hello.ts`,
          templateFile: `plop-templates/example/pages/api/hello-edge.ts`,
        })
      }

      if (data.options.includes('edge-middleware')) {
        actions.push({
          type: 'add',
          path: `{{exampleScopeFolder}}/${plopExampleName}/middleware.ts`,
          templateFile: `plop-templates/example/middleware.ts`,
        })
      }

      return [
        ...actions,
        // README.md
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP TITLE HERE --)/gi,
          template: `${data.name}`,
        },
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP EXAMPLE NAME HERE --)/gi,
          template: `${plopExampleName}`,
        },
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP PATH HERE --)/gi,
          template: `${plopPath}`,
        },
        // package.json
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/package.json`,
          pattern: /(-- PLOP EXAMPLE NAME HERE --)/gi,
          template: `${plopExampleName}`,
        },

        // pages/index.tsx
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/pages/index.tsx`,
          pattern: /(-- PLOP TITLE HERE --)/gi,
          template: `${data.name}`,
        },
      ]
    },
  })
}
