#!groovy

def notify_slack(Map args, credential_id='slack-hook') {
  def command = "${env.WORKSPACE}/bin/slack-notify.sh"
    withCredentials([string(credentialsId: credential_id, variable: 'HOOK')]) {
      for (arg in args) {
        command += " --${arg.key} '${arg.value}'"
      }
      command += " --hook '${HOOK}'"
      sh command
    }
}

def buildSite() {
  stage ('build') {
    try {
      sh 'bin/build.sh'
    } catch(err) {
      notify_slack([
        status: "failure",
        stage: "Build ${env.BRANCH_NAME} failed"
      ])
      throw err
    }
  }
}

def syncS3(String bucket, String extra_args='') {
  stage ('s3 sync') {
    try {
      sh "bin/s3-sync.sh ${bucket} ${extra_args}"
    } catch(err) {
      notify_slack([
        status: "failure",
        stage: "S3 Sync ${env.BRANCH_NAME} failed"
      ])
      throw err
    }
    notify_slack([
      status: "success",
      stage: "S3 Sync ${env.BRANCH_NAME} shipped"
    ])
  }
}

node {
  stage ('Prepare') {
    checkout scm
  }
  if ( env.BRANCH_NAME == 'prod' ) {
    buildSite()
    syncS3('mdninteractive-b77d14bceaaa9ea4')
  }
  stage('Cleanup') {
    // Clean our workspace
    cleanWs()
  }
}
