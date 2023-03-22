FROM amazonlinux:2

# Install Python and and Pyton Package Manager 
RUN yum install -y python37 && \
    yum install -y python3-pip && \
    yum install -y zip && \
    yum clean all

# Set up upgrade PIP and Venv (virtuatl env)
RUN python3.7 -m pip install --upgrade pip && \
    python3.7 -m pip install virtualenv
RUN python3.7 -m venv base
RUN source base/bin/activate

# Install dependencies from requirements.txt
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip python dir up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]