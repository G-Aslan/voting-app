pipeline {
    agent any 

    stages {
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
                }
            }
        }

        stage('Build Web App Docker Image') {
            steps {
                dir('web-app') {
                    sh '''
                        docker buildx create --use --name mybuilder || true
                        docker buildx inspect mybuilder --bootstrap
                        docker buildx build --platform linux/amd64,linux/arm64 -t giladaslan9/web-app:latest --push .
                    '''
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh '''
                        docker buildx create --use --name mybuilder || true
                        docker buildx inspect mybuilder --bootstrap
                        docker buildx build --platform linux/amd64,linux/arm64 -t giladaslan9/backend:latest --push .
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up
            sh 'docker rmi giladaslan9/web-app:latest || true'
            sh 'docker rmi giladaslan9/backend:latest || true'
        }
        success {
            // Trigger the "K8s - Connection and Configuration" pipeline
            build job: 'K8s - Connection and Configuration', wait: false
        }
    }
}
