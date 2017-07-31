#!groovy

def buildSite() {
    stage ('build') {
      try {
        sh 'bin/build.sh'
      } catch(err) {
        sh "bin/irc-notify.sh --stage 'build " + env.BRANCH_NAME + "' --status 'failed'"
        throw err
      }
    }
}

def syncS3(String bucket) {
    stage ('s3 sync') {
        try {
          sh "cd docs && aws s3 sync . s3://" + bucket +" --acl public-read --delete --profile mdninteractive"
        } catch(err) {
          sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'failed'"
          throw err
        }
        sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'shipped'"
    }
}

node {
    stage ('Prepare') {
      checkout scm
    }
    if ( env.BRANCH_NAME == 'dp_test_deploy' ) {
      buildSite()
      syncS3('mdninteractive')
    }
}
