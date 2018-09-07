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
        if (is_mozmeao_pipeline()) {
            // TODO: After cutover to IT-owned services, remove this branch.
            syncS3('mdninteractive', '--profile mdninteractive')
        } else {
            syncS3('mdninteractive-b77d14bceaaa9ea4')
        }
    }
}
