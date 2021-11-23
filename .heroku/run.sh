echo "***************** building frontend ******************"
git clone https://github.com/syedtaqi95/business-activity-frontend.git
cd business-activity-frontend
git checkout heroku
npm install
npm run build
echo "***************** completed frontend build ******************"