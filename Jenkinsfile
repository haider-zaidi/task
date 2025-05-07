pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = 'dockerhub-credentials-id'   // Jenkins credential ID
        DOCKERHUB_USER = 'your-dockerhub-username'
        BACKEND_IMAGE = 'your-dockerhub-username/sum-backend'
        FRONTEND_IMAGE = 'your-dockerhub-username/sum-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-user/sum-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    script {
                        sh "docker build -t $BACKEND_IMAGE ."
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    script {
                        sh "docker build -t $FRONTEND_IMAGE ."
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
                        sh "docker push $BACKEND_IMAGE"
                        sh "docker push $FRONTEND_IMAGE"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }
    }
}
