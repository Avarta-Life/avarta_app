FROM ubuntu:20.04
USER root
RUN apt-get update && \
    apt-get install -y curl git && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
#RUN apt install git -y
RUN git clone https://github.com/Avarta-Life/avarta_app.git
WORKDIR avarta_app
RUN npm install 
CMD ["npm", "run","dev"]
