# Personal Website

See: [eldon.ru](https://zeldon.ru).

My personal website. An [MIT](https://github.com/xzeldon/zeldon-site/blob/main/LICENSE) licensed, easy modifiable. 

## Dependencies

Only [ite](https://vitejs.dev/) for development and bundling.

## Set up

To download the repository and install dependencies, run the following commands:

```bash
git clone git@github.com:xzeldon/zeldon-site.git # replace [xzeldon] with your github username if you fork first.
cd zeldon-site
npm install
```

## Running

Run the following command to build the application and serve it with fast refresh:

```bash
npm run dev
```

Your web browser should automatically open to `<ip>:<port>:<path>` default: [http://localhost:3000/](http://localhost:3000/).

## Static export

To statically export the site, run this command:
```bash
npm run build
```

This generates a static export of the website as `zeldon-site/dist/`. Copy this and self-host or deploy to a CDN.

## Acknowledgements

* Background animation: [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) by [@PavelDoGreat](https://github.com/PavelDoGreat).
* Special thanks to [@xm1ller](https://github.com/xm1ller) for tirelessly answering all of my css questions.
