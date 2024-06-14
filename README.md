# React App

Simple frontend to view the player info served from <a href="https://github.com/suresh22l/backend-playerapp/" target="_blank">PlayerApp</a>. 

## Launch App locally

Follow the below steps to clone the project from the github repository and install it or you could deploy them using helm charts (steps provided below).

```bash
git clone git@github.com:suresh22l/react-pagination-demo.git
```

Update the field REACT_APP_BCKEND_API_URL with PlayerApp SERVICE url in .env file
```bash
cd react-pagination-demo/
vi .env
npm install
npm start
```

## Deploy using helm chart :
This project was tested using minikube k8s cluster.

#### Download helm chart
```
git clone git@github.com:suresh22l/react-pagination-demo.git
```

Update the service type and port information (LoadBalancer/NodePort), so the frontend react app is reachable from the local browser.
Also update the backend_api_url for the frontend to connect to PlayerApp.
```
vi react-pagination-demo/react-pagination/values.yaml
```
```
...
backend_api_url
...
service:
  type: NodePort
  port: 3000
...
```

#### Install helm chart
```
cd react-pagination-demo/react-pagination
helm install frontend ./
```

#### Test the Helm deployment
```bash
http://<SERVICE_IP>:<SERVICE_PORT>/
```
<SERVICE_IP> & <SERVICE_PORT> are obtained from k8s command.
```
kubectl describe svc backend-playerapp
```

#### Output
<img width="403" alt="image" src="https://github.com/suresh22l/react-pagination-demo/assets/39839103/eea0f83d-8e5f-48ca-9562-e75bbb89c8df">


## Architecture
![Untitled Diagram drawio (3)](https://github.com/suresh22l/backend-playerapp/assets/39839103/4afbb014-a93b-4c63-b3cc-2fd7f18191d5)

