
echo "go to Node folder"
cd NodeJS
if [ -d buildPepper/ ]; then
    rm -rf buildPepper/*
    echo "buildPepper folder deleted"
else 
    echo "build not exist"
fi
if [ -d buildUser/ ]; then
    rm -rf buildUser/*
    echo "buildUser folder deleted"
else 
    echo "build not exist"
fi
echo "go to ReactPepper folder"
cd ../ReactPepper/
npm install
echo "build project"
npm run-script build --silent
echo "copy build into node project"
mkdir -p ../NodeJS/buildPepper
cp -r build/* ../NodeJS/buildPepper
echo "go back into ReactUser"
cd ../ReactUser
npm install
echo "build project"
npm run-script build --silent
echo "copy build into node project"
mkdir -p ../NodeJS/buildUser
cp -r build/* ../NodeJS/buildUser
echo "go back into NodeJS"
cd ..
sleep 10