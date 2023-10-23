# CI/CD con Next.js. Github Actions y Github Pages

Este es un repositorio creado para aplicar conceptos de CI/CD a un proyecto de Next.js., el cual consta de 3 jobs:

- **Test**: Ejecuta los tests de la aplicación.
    ```yaml
    test:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
            uses: actions/checkout@v3
        - name: Setup Node
            uses: actions/setup-node@v3
            with:
            node-version: "18"
            cache: "npm"
        - name: Install dependencies
            run: npm ci
        - name: Test with Jest
            run: npm run test
    ```
- **Build**: Construye la aplicación y la exporta a HTML estático.
    ```yaml
    build:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
            uses: actions/checkout@v3
        - name: Setup Node
            uses: actions/setup-node@v3
            with:
            node-version: "18"
            cache: "npm"
        - name: Setup Pages
            uses: actions/configure-pages@v3
            with:
            static_site_generator: next
        - name: Install dependencies
            run: npm ci
        - name: Build with Next.js
            run: npm run build
        - name: Upload artifact
            uses: actions/upload-pages-artifact@v2
            with:
            path: ./build
    ```
- **Deploy**: Despliega la aplicación en Github Pages.
    ```yaml
    deploy:
        runs-on: ubuntu-latest
        if: startsWith(github.ref, 'refs/heads/release/')
        needs: build
        permissions:
        contents: read
        pages: write
        id-token: write
        environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
        steps:
        - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v2
        - name: Show deployment URL
            run: echo ${{ steps.deployment.outputs.page_url }}

    ```

## Ramas donde se ejecutan los jobs al hacer push

- **feature/\*\***: Se ejecutan los jobs de Test y Build.
- **release/\*\***: Se ejecutan los jobs de Test, Build y Deploy.

```yaml
push:
    branches: ["feature/**", "release/**"]
```

## Horario de ejecución del workflow

- **Todos los lunes a las 15:45 (GMT-4)**
- **Todos los lunes a las 20:00 (GMT-4)**

```yaml
schedule:
    - cron: "45 19 * * 1"
    - cron: "0 0 * * 2"
```

## Posibilidad de ejecutar el workflow manualmente

Para ejecutar el workflow manualmente, se ir a la pestaña de **Actions** y seleccionar el workflow **Deploy next.js to Pages**. Una vez ahí, se debe hacer click en el botón **Run workflow** y seleccionar alguna de las ramas que se despliegan en el menú desplegable.

```yaml
workflow_dispatch:
```


## Página desplegada

La página desplegada se puede ver en el siguiente enlace: [https://dylan-chambi.github.io/Github-Actions-Next/](https://dylan-chambi.github.io/Github-Actions-Next/)