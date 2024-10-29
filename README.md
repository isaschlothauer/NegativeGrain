# Negative Grain
(Work in progress)

### Contents
[Description](#description) \
[Current Status](#current-status) \
[Techstacks](#techstacks) \
[**Quick start guide**](#quick-start-guide) \
[Implemented](#implemented) \
[Unimplemented](#unimplemented)

### Description
Negative Grain aims to provide a platform for photographers and photography enthusiasts to share and discover photography by providing a simple and concise UI without 'like' or popularity based engagements. Each post can include photographer's artistic description as well we technical data for searchability. 

This repository contains both frontend and backend sources. Database file is available for import within backend root directory. 

#### Techstacks
NextJS (frontend), Node/Express (backend), MySql/Mariadb (server), Typescript, pnpm

### Current Status
Currently Negative Grain is in development stage, and advanced function may not be implemented.  

### Quick start guide
    # Install required packages in frontend and backend root directories. 

    # Setup npm packages via pnpm
    # In root directory: pnpm install i -r 
    # Or in frontend/backend directory, whichever desired

    # Database
    # import database into MySql or Mariadb
    # sql file is in root/backend/*.sql

    # Frontend environment setup
    # Create and configure frontend environment from root/frontend/.env.local 

    # Backend environment setup
    # Create and configure backend environment from root/backend/.env.example
    
    # Image storage directory
    # default image storage directory: /backend/src/image_storage
    # Image storage path configuration in .env file

    # Cors is setup to use frontend port in .env
    # Cors is configured in backend/src/config/cors.ts

    # From the project root directory, run frontend and backend concurrently via: 
    pnpm run dev 

#### Implemented
- User account creation
- Login authentication/log in 
- Sign off
- Post feed (newest post)
- Image view in modal
- Post creation with
    - Image data 
    - Image file upload (storage location configurable)


#### To be implemented
- Feed limiter 
- Linking (favorite)
- User preference feed (algorithm feed)
- User linking feed (favorite feed)
- User profile edit
- Search function



