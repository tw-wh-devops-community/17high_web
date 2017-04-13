docker login registry.cn-hangzhou.aliyuncs.com -u wjyaowh -p wh2017devops
echo "building and pushing docker image"
./gradlew buildDocker
docker logout

echo "deployment of latest app image is done!"