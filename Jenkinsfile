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

        stage('Code Quality Check') {
            steps {
                dir('web-app') {
                    sh 'npm install && npm run lint' // Adjust according to your linter
                }
                dir('backend') {
                    sh 'pip install flake8 && flake8 .' // Adjust according to your linter
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('web-app') {
                    sh 'npm test'
                }
                dir('backend') {
                    sh 'pytest'
                }
            }
        }

        stage('Scan Docker Images') {
            steps {
                dir('web-app') {
                    sh 'trivy image giladaslan9/web-app:latest'
                }
                dir('backend') {
                    sh 'trivy image giladaslan9/backend:latest'
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
            // Trigger the "Approval" pipeline
            build job: 'Approval', wait: false
        }
        failure {
            // Notify team on failure (e.g., Slack, email)
            echo 'Build failed!! Please check the console output for more details.'
        }
    }
}
