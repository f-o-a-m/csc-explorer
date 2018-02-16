pipeline {
  agent any

  tools {nodejs "node-8.7.0"}

  stages {
    stage('Prepare') {
      steps {
        script {
          env.GIT_SHORTREF = sh(script: 'git rev-parse --short HEAD', returnStdout: true)
          env.DOCKER_REG = "docker.kube-system.svc.cluster.local"
        }
      }
    }

    stage('npm install') {
      steps {
        sh('npm install')
      }
    }

    stage('npm run build') {
      steps {
        sh('npm run build')
      }
    }

    stage('Dockerize and rollout') {
      when {
        branch 'master'
      }
      steps {
        sh('docker build -t $DOCKER_REG/foam/proto-frontend:$GIT_SHORTREF .');
        sh('docker tag $DOCKER_REG/foam/proto-frontend:$GIT_SHORTREF $DOCKER_REG/foam/proto-frontend:latest');
        sh('docker push $DOCKER_REG/foam/proto-frontend:$GIT_SHORTREF');
        sh('docker push $DOCKER_REG/foam/proto-frontend:latest');
        sh('kubectl set image -n foam --record deployments/proto-frontend nginx=$DOCKER_REG/foam/proto-frontend:$GIT_SHORTREF');
        sh('kubectl rollout status -n foam deployments/proto-frontend');
      }
    }
  }
}
