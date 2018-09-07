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
            sh "bin/s3-sync.sh " + bucket
        } catch(err) {
            sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'failed'"
            throw err
        }
        sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'shipped'"
    }
}

def is_mozmeao_pipeline() {
    /*
     * Temporary function that returns true if this is running on the
     * MozMEAO-owned Jenkins service targeting the MozMEAO-owned S3 bucket.
     * TODO: After cutover to IT-owned services, remove this function.
     */
    return env.JOB_NAME.startsWith('mdn_interactive_examples/')
}

node {
    stage ('Prepare') {
        checkout scm
    }
    if ( env.BRANCH_NAME == 'prod' ) {
        buildSite()
        syncS3(is_mozmeao_pipeline() ? 'mdninteractive' : 'mdninteractive-b77d14bceaaa9ea4')
    }
}
