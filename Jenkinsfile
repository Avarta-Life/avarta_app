pipeline{
    agent any
    stages{
        stage('clean'){
            steps{
                script{
                    sh "rm -rf *"
                }
            }
        }
        stage('Authenticate with GCR') {
            steps {
                withCredentials([file(credentialsId: 'gcr', variable: 'GCR_KEY_FILE')]) {
                    script {
                        // Authenticate Docker to GCR
                        sh '''
                            #!/bin/bash
                            # Authenticate the service account
                            gcloud auth activate-service-account --key-file=${GCR_KEY_FILE}
                            
                            # Configure Docker to use gcloud credentials for GCR
                            gcloud auth configure-docker us-docker.pkg.dev --quiet
                        '''
                    }
                }
            }
        }
        stage('clone repo and build docker image'){
            steps{
                script{
                sh "git clone https://github.com/Avarta-Life/avarta_app.git"
                sh "docker build  --no-cache  -t image_frontend:latest  -f avarta_app/Dockerfile ."
            }
        }
        }
        
        stage('Push'){
            steps{
                script{
                    sh "gcloud auth configure-docker us-docker.pkg.dev --quiet"
                    sh "docker tag image_frontend:latest us-docker.pkg.dev/skilled-mark-356916/avarta/avarta:frontend_$BUILD_NUMBER"
                    sh "docker push us-docker.pkg.dev/skilled-mark-356916/avarta/avarta:frontend_$BUILD_NUMBER"
                    sh "docker rmi us-docker.pkg.dev/skilled-mark-356916/avarta/avarta:frontend_$BUILD_NUMBER"
            
                }
            }
        }
       
        stage('Add IAM Policy Binding') {
            steps {
                withCredentials([file(credentialsId: 'cloudrun', variable: 'CLOUDRUN_KEY_FILE')]) {
                    script {
                        // Add IAM policy binding
                        sh '''
                            #!/bin/bash
                            gcloud auth activate-service-account --key-file=${CLOUDRUN_KEY_FILE}
                            gcloud run services add-iam-policy-binding avarta-frontend \
                                --member=allUsers \
                                --role=roles/run.invoker \
                                --platform=managed \
                                --region=us-central1 \
                                --quiet
                        '''
                    }
                }

            }
        } 
        stage('Deploy to Cloud Run') {
            steps {
                withCredentials([file(credentialsId: 'cloudrun', variable: 'CLOUDRUN_KEY_FILE')]) {
                    script {
                        // Deploy to Cloud Run
                        sh '''
                            #!/bin/bash
                            
                            gcloud auth activate-service-account --key-file=${CLOUDRUN_KEY_FILE}
                            
                            gcloud run deploy avarta-frontend --image=us-docker.pkg.dev/skilled-mark-356916/avarta/avarta:frontend_${BUILD_NUMBER} --port=3000 --region us-central1 --quiet
                        '''
                    }
                }
            }
        }
    }
    }
    
