# Curator

Curator is an open source, personal, and private app that you can use to import and re-discover internet clips over time.

Read the [documentation](https://curator.krxiang.com). 


![](/images/front.png)

It differs from other bookmarking sites by its method of importing items and rediscovering them. 

Import only what you need (SingleFile saves, Evernote export, files, etc.), and discover them via an algorithm:

![](/images/discoverDark.png)

## Installation 

Install Curator with Docker compose:

```
services:
  pocketbase:
    image: kangruixiang/pocketbase:latest
    volumes:
      - ./pb_data:/app/db/pb_data # database folder
    ports:
      - "8090:8090"
    restart: unless-stopped

  curator:
    image: kangruixiang/curator:latest
    environment: 
      - PUBLIC_POCKETBASE_URL=http://localhost:8090 # change this to your actual pocketbase service URL 
      - PUBLIC_INTERNAL_POCKETBASE_URL=http://pocketbase:8090
      - ORIGIN=http://127.0.0.1:3000 # change this to curator server URL
    depends_on: 
      - pocketbase
    ports: 
      - "3000:3000"
    restart: unless-stopped
```
