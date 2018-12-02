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

def syncS3(String bucket, String extra_args='') {
    stage ('s3 sync') {
        try {
            sh "bin/s3-sync.sh ${bucket} ${extra_args}"
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
    if ( env.BRANCH_NAME == 'prod' ) {
        buildSite()
        syncS3('mdninteractive-b77d14bceaaa9ea4')
    }
}
