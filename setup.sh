#!/bin/bash

cd frontend
npm install
cd ..

cd backend
npm install
cd ..

if [ ! -f ".env" ]; then
	cp .env.template .env
fi
