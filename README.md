# NC News

Northcoders News is a social news aggregation, rating and discussion website for accessing and contributing to the latest developments. The project was built using React.

Each article on Northcoders News is divided into a particular topic. Each article has a user-driven rating system, which can be provided with up or down votes using the back-end API. Users may add comments to an article, which may also be voted up or down.

Users may add additional articles to the website, selecting from existing topics. The website also offers functionality to add any topic of the user's choosing, after which articles may be added under that topic.

Users are able to delete their own articles from within the article itself as well as delete any comments they have added.

The hosted version of this project is available at https://nc-news-james.netlify.com/.

The project utilised the back-end API, the repository for which can be found at https://github.com/jameswmoar/be-nc-news. The hosted version of the back-end project may be found at https://nc-news-james.herokuapp.com/api/.

## Getting Started

These instructions will get the project functioning locally to facilitate development and testing. For details on how to deploy the project on a live system, please refer to the deployment notes.

## _Prerequisites_

This project utilises the following dependencies, which will be installed as part of the below installation process:

| Dependency    | Version |
| ------------- | ------- |
| Axios         | 0.19.0  |
| @reach/router | 1.2.1   |
| React         | 16.8.6  |
| React-dom     | 16.8.6  |
| React-scripts | 3.0.1   |

## _Installing_

After forking this repository, clone its contents to your local system by using the following terminal command:

```
$ git clone https://github.com/<your-github-username>/fe-nc-news
```

You may then open the repository in your favoured code editor. After installing the relevant dependencies, the project can be viewed in a local environment by running the command:

```
$ npm run start
```

This will start a local server and open a local instance of the project in your default browser.

## After Installation

After successfully installing the various dependencies and running the initial scripts, you will be free to explore and alter the project as you see fit.

## Deployment

In order to prepare a production build of the project, simply run the following command:

```
$ npm run build
```

This build may then be deployed to your preferred host. If using Netlify, please ensure that the build folder is entered as the deploy path.

## Acknowledgments
