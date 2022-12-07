def call(Map config = [:]) {
//   echo "hello ${config.name}, nice to meet you ${config.day}. Just for testing ${config.test}"
  
  def app
  def ImageNmme = config.ImageNmme
  def CredentialID = config.CredentialID
  def Repository = config.Repository
  def TagName = config.TagName
  
  echo " ImageName: ${ImageNmme}"
  echo " CredentialID: ${CredentialID}"
  echo " Repository: ${Repository}"
  echo " TagName: ${TagName}"
  
  if (isNull(ImageNmme)) {ex(ImageNmme)}
  if ("!${CredentialID}") {ex(CredentialID)}
  if ("!${Repository}") {ex(Repository)}
  if ("!${TagName}") {ex(TagName)}
  
  stage "Pull image"
  app = docker.image("${ImageName}")
  app.pull()
  sh "docker images"

//   stage "Run Image"
//   sh "docker run -d -p 8888:80 prakhar1989/static-site"
//   app.run("-p 8888:80")

  stage "Push Image"
  docker.withRegistry("", "${CredentialID}") {
//       app.push('latest')
//       sh "docker tag prakhar1989/static-site trylisin/testing"
//       if ("${Repository}" != "OK") {ex("Repository")}
      sh "docker tag $app.id ${Repository}/${TagName}"
      sh "docker push ${Repository}/${TagName}"
      sh "docker logout"
  }
}


def ex(param){
    currentBuild.result = 'ABORTED'
    error('BAD PARAM: ' + param)
}
