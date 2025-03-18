pipeline {
    agent any
    
    tools {
        nodejs '23.5.0'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Set Environment Variable') {
            steps {
                script {
                    // Write the .env file with the provided environment variables
                    writeFile file: '.env', text: """
                    NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
                    DATABASE_URL=${DATABASE_URL}
                    NEXTAUTH_URL=${NEXTAUTH_URL}
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Database') {
            steps {
                echo 'Building the database...'
                sh 'npx prisma db push'
            }
        }

        // stage('Build Next.js Project') {
        //     steps {
        //         echo 'Building the project...'
        //         sh 'npm run build'
        //     }
        // }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image after the Next.js build
                    sh """
                    docker build -t gementar-ipv:latest .
                    """
                }
            }
        }
        
        stage('Save Docker Image as Artifact') {
            steps {
                script {
                    // Save the Docker image to a .tar file
                    sh """
                    docker save -o gementar-ipv.tar gementar-ipv:latest
                    """
                }
            }
        }
        
        stage('Archive Docker Image') {
            steps {
                script {
                    // Archive the .tar file as an artifact in Jenkins
                    archiveArtifacts artifacts: 'gementar-ipv.tar', allowEmptyArchive: true
                }
            }
        }
    }
}
