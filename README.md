# Curator

Curator is an open source, personal, and private app that you can use to import and re-discover internet clips over time.

Read the [documentation](https://curator.krxiang.com). 


![](/images/front.png)


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

  curator:
    image: kangruixiang/curator:latest
    environment: 
      - PUBLIC_POCKETBASE_URL=http://localhost:8090 # change this to your actual server URL 
      - PUBLIC_INTERNAL_POCKETBASE_URL=http://pocketbase:8090
    depends_on: 
      - pocketbase
    ports: 
      - "3000:3000"
```
