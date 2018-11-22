FROM ubuntu:bionic

# Update aptitude with new repo
RUN apt-get update

# Install software 
RUN apt-get install -y git make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev mysql-server libmysqlclient-dev curl 

# Install node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs

# Install expo-cli
RUN npm install -g expo-cli

# Install pyenv
RUN curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
RUN pyenv install 3.7.0
RUN pyenv global 3.7.0
RUN echo 'export PATH="~/.pyenv/bin:$PATH"' >> .bashrc
RUN echo 'eval "$(pyenv init -)"' >> .bashrc
RUN echo 'eval "$(pyenv virtualenv-init -)"' >> .bashrc
RUN pyenv virtualenv LDSO

# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts

# Add gitlab key
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# Clone the conf files into the docker container
RUN git clone git@gitlab.com:feup-tbs/ldso18-19/t4g2.git

# Install npm packages
WORKDIR /t4g2/app
RUN npm install .

# Install pip packages
WORKDIR /t4g2/server
RUN pyenv activate LDSO
RUN pip install -r requirements.txt


