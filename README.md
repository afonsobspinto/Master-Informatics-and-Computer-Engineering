# Routine management system
![Issues Open](https://img.shields.io/badge/issues-open_34-54cc1f.svg) ![Issues Closed](https://img.shields.io/badge/issues-closed_0-d7af23.svg) ![Downloads](https://img.shields.io/badge/downloads-0_total-54cc1f.svg) ![Version](https://img.shields.io/badge/version-0.0.1-54cc1f.svg)

Routine management system is a mobile application to handle routines of children and teenagers diagnosed with **autism spectrum disorder** in a form of game.
## Guiding principles
- __User friendliness.__ We put user experience front and center. Routine management system follows best practices for reducing visual load: it offers consistent & simple designs, it minimizes the number of potential distractions in common use cases, and it provides a clear and actionable interface even upon user error.

- __Customizable.__ New images are simple to upload, and existing icon packs provide ample options to customize every aspect of the game. The abiliity to easily change colors allows for total customization, making routine management system suitable for the target audience.

## How To

### Getting Started

These instructions will get you a copy of the project up and running on your local machine. See deployment for notes on how to deploy the project on a live system.

#### Setup Django serve
**Disclaimer:**
The following notes are intended to help you set up the Django development environment in Ubuntu, if you use another OS or you want jungle instead please search on your own. 

*  Use [pyenv](https://github.com/pyenv/pyenv) and set up a new virtual environment for python 3.7:
```
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
pyenv install 3.7.0
pyenv global 3.7.0
pyenv virtualenv LDSO
pyenv activate LDSO

```
* Install mysql stuff:
```
sudo apt-get install mysql-server
sudo apt-get install libmysqlclient-dev
```

* Install requirements
```
pyenv activate LDSO
cd your/path/t4g2/server
pip install -r requirements.txt
```

* Install [docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt) and [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04) (links are tutorials)

#### How to use:

Development Recommended Way - Running only db on docker:
``` 
pyenv activate LDSO
cd your/path/t4g2/server/db-on-docker
docker-compose up
cd your/path/t4g2/server
cat dev.env > .env (copies the content of dev.env to .env, you may want to save .env content first)
python manage.py runserver 
open http://127.0.0.1:8000/routine-manager and enjoy
```
Anohter way - Run django and db on docker:
``` 
cd your/path/t4g2/server
docker-compose up
open http://127.0.0.1:8000/routine-manager and enjoy
```

#### Deploy the project

In the folder of the project (t4g2):

```
cd app
npm install
npm start ('expo start' can also be used)
```


## Meet the team

 <img src="https://assets.gitlab-static.net/uploads/-/system/user/avatar/491728/avatar.png?width=90" height="50px" title="Afonso Pinto"/>[`@afonsobspinto`](https://gitlab.com/afonsobspinto) <img src="https://secure.gravatar.com/avatar/eb600d9a9783d4ccb83734dbec32c13b?s=180&d=identicon" height="50px" title="Francisco Maria"/>[`@francismaria`](https://gitlab.com/francismaria) <img src="https://assets.gitlab-static.net/uploads/-/system/user/avatar/2846767/avatar.png?width=90" height="50px" title="João Castro"/>[`@joaopscastro`](https://gitlab.com/joaopscastro) <img src="https://assets.gitlab-static.net/uploads/-/system/user/avatar/2846756/avatar.png?width=90" height="50px" title="Miguel Mano"/>[`@aquelemiguel`](https://gitlab.com/aquelemiguel) 
 
 <img src="https://assets.gitlab-static.net/uploads/-/system/user/avatar/2636555/avatar.png?width=90" height="50px" title="Paulo Correia"/>[`@Pipas`](https://gitlab.com/Pipas) <img src="https://secure.gravatar.com/avatar/091cec4c986bc29c9ec8ed00aeb8dfa1?s=180&d=identicon" height="50px" title="Rui Oliveira"/>[`@ruimoliveira`](https://gitlab.com/ruimoliveira) <img src="https://secure.gravatar.com/avatar/cb3ba64ae1e69e3d1b5a051ccd576fae?s=180&d=identicon" height="50px" title="Rex Kerr"/>[`@chaotixkilla`](https://gitlab.com/chaotixkilla)


## Tools we use

<img src="https://reactjs.org/logo-og.png" height="50px" title="React Native"/> [`React Native`](https://facebook.github.io/react-native/) 


## Related Projects

For a complete list, please see the [Market Research](https://gitlab.com/ldso18-19/t4g2/wikis/Market-research) page on our wiki.


![ForTheBadge makes-people-smile](http://ForTheBadge.com/images/badges/makes-people-smile.svg)
![ForTheBadge built-with-science](http://ForTheBadge.com/images/badges/built-with-science.svg)
