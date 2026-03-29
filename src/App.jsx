import { useState, useEffect } from 'react'
import './App.css'

const quizData = [
  // 40-minute mode: Mix of hard and medium questions
  // 90-minute mode: All questions
  {
    id: 1,
    type: "single",
    domain: "Cloud Concepts",
    question: "A company wants to avoid large upfront hardware purchases and instead pay only for the resources it uses. Which cloud benefit does this describe?",
    options: [
      "Economies of scale",
      "Trade capital expense for variable expense",
      "Increase global reach in minutes",
      "Stop guessing capacity"
    ],
    correct: 1,
    explanation: "One of the core cloud value propositions is replacing upfront capital expense with pay-as-you-go variable expense.",
    difficulty: "medium"
  },
  {
    id: 2,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which pillar of the AWS Well-Architected Framework focuses on running and monitoring systems to deliver business value and continually improve processes?",
    options: [
      "Security",
      "Operational Excellence",
      "Reliability",
      "Cost Optimization"
    ],
    correct: 1,
    explanation: "Operational Excellence focuses on operations, monitoring, continuous improvement, and learning from failures.",
    difficulty: "medium"
  },
  {
    id: 3,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which design principle is recommended by the AWS Well-Architected Framework?",
    options: [
      "Make large, infrequent changes to reduce risk",
      "Manage infrastructure manually",
      "Learn from operational failures",
      "Use monolithic design for all workloads"
    ],
    correct: 2,
    explanation: "AWS recommends learning from operational failures as part of Operational Excellence.",
    difficulty: "hard"
  },
  {
    id: 4,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which cloud concept allows a company to instantly provision more resources during peak demand and release them when demand drops?",
    options: [
      "Elasticity",
      "Data sovereignty",
      "Capital budgeting",
      "Manual scaling"
    ],
    correct: 0,
    explanation: "Elasticity means automatically or quickly scaling resources up and down based on demand.",
    difficulty: "medium"
  },
  {
    id: 5,
    type: "single",
    domain: "Cloud Concepts",
    question: "A startup is unsure how much compute capacity it will need next month. Which AWS Cloud benefit helps most with this uncertainty?",
    options: [
      "Stop guessing capacity",
      "Manual hardware procurement",
      "Dedicated on-premises ownership",
      "Physical data center control"
    ],
    correct: 0,
    explanation: "AWS helps avoid overprovisioning or underprovisioning by allowing customers to scale resources as needed.",
    difficulty: "medium"
  },
  {
    id: 6,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which deployment model is an example of cloud computing?",
    options: [
      "Buying servers for a company data center",
      "Using AWS over the internet",
      "Installing software on a single laptop",
      "Hosting an application on a USB drive"
    ],
    correct: 1,
    explanation: "Using AWS services over the internet is cloud computing.",
    difficulty: "easy"
  },
  {
    id: 7,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which AWS pricing model offers a discount in exchange for a commitment to use a certain amount of resources over a 1-year or 3-year term?",
    options: [
      "On-Demand pricing",
      "Reserved pricing commitment",
      "Spot pricing",
      "Free Tier pricing"
    ],
    correct: 1,
    explanation: "Savings-oriented commitment models such as Reserved Instances and Savings Plans provide discounts for committed usage.",
    difficulty: "medium"
  },
  {
    id: 8,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which AWS feature best supports disaster recovery by allowing workloads to be deployed in multiple geographic areas?",
    options: [
      "Amazon CloudFront edge caching only",
      "AWS Regions",
      "Single Availability Zone deployments",
      "Dedicated Hosts"
    ],
    correct: 1,
    explanation: "AWS Regions are separate geographic areas that support disaster recovery and global deployment strategies.",
    difficulty: "medium"
  },
  {
    id: 9,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which statement best describes high availability in AWS?",
    options: [
      "Running an application in one Availability Zone only",
      "Using multiple Availability Zones to reduce a single point of failure",
      "Using a larger EC2 instance in one data center",
      "Storing backups on a local desktop"
    ],
    correct: 1,
    explanation: "High availability is commonly achieved by distributing resources across multiple Availability Zones.",
    difficulty: "medium"
  },
  {
    id: 10,
    type: "single",
    domain: "Security and Compliance",
    question: "Under the AWS shared responsibility model, which task is AWS responsible for?",
    options: [
      "Configuring customer IAM users",
      "Patching the guest operating system on Amazon EC2",
      "Securing the physical infrastructure of AWS data centers",
      "Creating application-level encryption keys for customer applications"
    ],
    correct: 2,
    explanation: "AWS is responsible for security of the cloud, including physical facilities, hardware, and foundational infrastructure.",
    difficulty: "hard"
  },
  {
    id: 11,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service helps control access to AWS resources by using users, groups, and roles?",
    options: [
      "Amazon GuardDuty",
      "AWS IAM",
      "AWS Shield",
      "Amazon Inspector"
    ],
    correct: 1,
    explanation: "AWS Identity and Access Management (IAM) controls authentication and authorization for AWS resources.",
    difficulty: "medium"
  },
  {
    id: 12,
    type: "single",
    domain: "Security and Compliance",
    question: "What is the security best practice for granting permissions in AWS?",
    options: [
      "Grant all permissions to all users",
      "Use the principle of least privilege",
      "Create one shared root account for administrators",
      "Store access keys in application source code"
    ],
    correct: 1,
    explanation: "Least privilege means granting only the permissions required to perform a task.",
    difficulty: "medium"
  },
  {
    id: 13,
    type: "single",
    domain: "Security and Compliance",
    question: "Which action is recommended for the AWS account root user?",
    options: [
      "Use it for daily administrative tasks",
      "Create multiple root users",
      "Enable MFA and avoid using it for routine access",
      "Share the root credentials with the operations team"
    ],
    correct: 2,
    explanation: "AWS recommends protecting the root user with MFA and limiting its use to tasks that require root credentials.",
    difficulty: "hard"
  },
  {
    id: 14,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service provides managed distributed denial of service (DDoS) protection?",
    options: [
      "AWS Shield",
      "AWS Artifact",
      "AWS Organizations",
      "Amazon Macie"
    ],
    correct: 0,
    explanation: "AWS Shield provides DDoS protection for AWS workloads.",
    difficulty: "medium"
  },
  {
    id: 15,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service helps identify potentially unauthorized or malicious activity in AWS accounts and workloads?",
    options: [
      "Amazon GuardDuty",
      "AWS IAM Identity Center",
      "AWS Trusted Advisor",
      "Amazon Route 53"
    ],
    correct: 0,
    explanation: "Amazon GuardDuty is a threat detection service that monitors for suspicious and malicious activity.",
    difficulty: "hard"
  },
  {
    id: 16,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service can be used to create and manage encryption keys?",
    options: [
      "AWS KMS",
      "Amazon Rekognition",
      "AWS Budgets",
      "AWS Snowball"
    ],
    correct: 0,
    explanation: "AWS Key Management Service (KMS) is used to create and manage encryption keys.",
    difficulty: "medium"
  },
  {
    id: 17,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service or feature allows customers to review AWS compliance reports and agreements?",
    options: [
      "AWS Artifact",
      "Amazon Inspector",
      "AWS Config",
      "AWS X-Ray"
    ],
    correct: 0,
    explanation: "AWS Artifact provides on-demand access to compliance reports and agreements.",
    difficulty: "hard"
  },
  {
    id: 18,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service continuously assesses applications on Amazon EC2 for software vulnerabilities and unintended network exposure?",
    options: [
      "Amazon Inspector",
      "Amazon SNS",
      "AWS Audit Manager",
      "AWS Cost Explorer"
    ],
    correct: 0,
    explanation: "Amazon Inspector helps detect software vulnerabilities and unintended network exposure.",
    difficulty: "medium"
  },
  {
    id: 19,
    type: "single",
    domain: "Security and Compliance",
    question: "A company wants to centrally manage multiple AWS accounts and apply service control policies (SCPs). Which AWS service should it use?",
    options: [
      "AWS Organizations",
      "AWS Shield Advanced",
      "Amazon VPC",
      "AWS Secrets Manager"
    ],
    correct: 0,
    explanation: "AWS Organizations helps centrally manage multiple AWS accounts and apply governance controls such as SCPs.",
    difficulty: "hard"
  },
  {
    id: 20,
    type: "single",
    domain: "Security and Compliance",
    question: "Which AWS service can securely store, rotate, and retrieve database credentials and other secrets?",
    options: [
      "AWS Secrets Manager",
      "Amazon SQS",
      "Amazon EventBridge",
      "AWS Direct Connect"
    ],
    correct: 0,
    explanation: "AWS Secrets Manager is used to manage secrets such as passwords, API keys, and database credentials.",
    difficulty: "medium"
  },
  {
    id: 21,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides scalable object storage for data such as backups, media files, and logs?",
    options: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS",
      "Amazon EC2"
    ],
    correct: 1,
    explanation: "Amazon S3 is AWS object storage and is commonly used for backups, media, logs, and static content.",
    difficulty: "easy"
  },
  {
    id: 22,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides virtual servers in the cloud?",
    options: [
      "Amazon S3",
      "Amazon EC2",
      "Amazon RDS",
      "AWS Lambda"
    ],
    correct: 1,
    explanation: "Amazon EC2 provides resizable compute capacity in the cloud.",
    difficulty: "easy"
  },
  {
    id: 23,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service lets you run code without provisioning or managing servers?",
    options: [
      "Amazon EC2",
      "AWS Lambda",
      "Amazon ECS",
      "AWS Outposts"
    ],
    correct: 1,
    explanation: "AWS Lambda is the serverless compute service for running code without managing servers.",
    difficulty: "medium"
  },
  {
    id: 24,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS database service is a managed relational database service?",
    options: [
      "Amazon DynamoDB",
      "Amazon DocumentDB",
      "Amazon RDS",
      "Amazon ElastiCache"
    ],
    correct: 2,
    explanation: "Amazon RDS is AWS's managed relational database service.",
    difficulty: "medium"
  },
  {
    id: 25,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS database service is a fully managed NoSQL key-value database?",
    options: [
      "Amazon Aurora",
      "Amazon Redshift",
      "Amazon DynamoDB",
      "Amazon RDS for SQL Server"
    ],
    correct: 2,
    explanation: "Amazon DynamoDB is a fully managed NoSQL key-value and document database.",
    difficulty: "medium"
  },
  {
    id: 26,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which service is used to create a logically isolated section of the AWS Cloud?",
    options: [
      "Amazon Route 53",
      "Amazon VPC",
      "Amazon CloudFront",
      "AWS Transit Gateway"
    ],
    correct: 1,
    explanation: "Amazon VPC provides networking isolation for AWS resources.",
    difficulty: "medium"
  },
  {
    id: 27,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides a content delivery network (CDN) for distributing content with low latency?",
    options: [
      "Amazon CloudFront",
      "Amazon SQS",
      "Amazon EC2 Auto Scaling",
      "AWS Batch"
    ],
    correct: 0,
    explanation: "Amazon CloudFront is AWS's CDN service.",
    difficulty: "medium"
  },
  {
    id: 28,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides highly available Domain Name System (DNS) web service functionality?",
    options: [
      "Amazon VPC",
      "Amazon Route 53",
      "Elastic Load Balancing",
      "AWS WAF"
    ],
    correct: 1,
    explanation: "Amazon Route 53 is the AWS DNS service.",
    difficulty: "medium"
  },
  {
    id: 29,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service automatically distributes incoming application traffic across multiple targets?",
    options: [
      "Elastic Load Balancing",
      "Amazon Inspector",
      "AWS Trusted Advisor",
      "AWS Budgets"
    ],
    correct: 0,
    explanation: "Elastic Load Balancing distributes traffic across multiple targets such as EC2 instances.",
    difficulty: "medium"
  },
  {
    id: 30,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service helps monitor applications and resources with metrics, alarms, and logs?",
    options: [
      "Amazon CloudWatch",
      "AWS Snowcone",
      "Amazon WorkSpaces",
      "AWS Glue"
    ],
    correct: 0,
    explanation: "Amazon CloudWatch provides monitoring, logs, metrics, dashboards, and alarms.",
    difficulty: "medium"
  },
  {
    id: 31,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service is best for sending messages between decoupled application components?",
    options: [
      "Amazon SQS",
      "Amazon EC2",
      "AWS Directory Service",
      "Amazon QuickSight"
    ],
    correct: 0,
    explanation: "Amazon SQS is a managed message queuing service used to decouple distributed applications.",
    difficulty: "medium"
  },
  {
    id: 32,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service is commonly used to send notifications to subscribers by SMS, email, or HTTP endpoints?",
    options: [
      "Amazon SNS",
      "Amazon MQ",
      "AWS Fargate",
      "AWS DataSync"
    ],
    correct: 0,
    explanation: "Amazon SNS is used for pub/sub messaging and notifications.",
    difficulty: "medium"
  },
  {
    id: 33,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "A company needs shared file storage for Linux-based Amazon EC2 instances. Which service should it use?",
    options: [
      "Amazon S3",
      "Amazon EBS",
      "Amazon EFS",
      "Amazon DynamoDB"
    ],
    correct: 2,
    explanation: "Amazon EFS provides shared, scalable file storage that can be mounted by multiple Linux instances.",
    difficulty: "hard"
  },
  {
    id: 34,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which storage option provides block storage for use with a single Amazon EC2 instance?",
    options: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon Glacier Instant Retrieval",
      "Amazon Athena"
    ],
    correct: 0,
    explanation: "Amazon EBS provides persistent block storage volumes for use with EC2.",
    difficulty: "medium"
  },
  {
    id: 35,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service can be used to run containers without managing servers or clusters?",
    options: [
      "AWS Fargate",
      "Amazon EC2 Auto Scaling",
      "AWS Storage Gateway",
      "Amazon Route 53"
    ],
    correct: 0,
    explanation: "AWS Fargate is a serverless compute engine for containers.",
    difficulty: "hard"
  },
  {
    id: 36,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service is a managed extract, transform, and load (ETL) service for analytics workloads?",
    options: [
      "AWS Glue",
      "Amazon Lightsail",
      "AWS Shield",
      "Amazon Cognito"
    ],
    correct: 0,
    explanation: "AWS Glue is a managed ETL and data integration service.",
    difficulty: "hard"
  },
  {
    id: 37,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS analytics service allows querying data in Amazon S3 using standard SQL?",
    options: [
      "Amazon Athena",
      "Amazon Neptune",
      "Amazon ECS",
      "AWS App Runner"
    ],
    correct: 0,
    explanation: "Amazon Athena lets users query data in S3 using standard SQL without managing infrastructure.",
    difficulty: "hard"
  },
  {
    id: 38,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service is used to create visual dashboards and business intelligence reports?",
    options: [
      "Amazon QuickSight",
      "Amazon Inspector",
      "AWS Config",
      "Amazon Textract"
    ],
    correct: 0,
    explanation: "Amazon QuickSight is AWS's business intelligence and visualization service.",
    difficulty: "medium"
  },
  {
    id: 39,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service helps migrate large amounts of data into and out of AWS using physical devices?",
    options: [
      "AWS Snow Family",
      "AWS Global Accelerator",
      "Amazon Connect",
      "Amazon SES"
    ],
    correct: 0,
    explanation: "The AWS Snow Family provides physical devices for edge computing and data transfer.",
    difficulty: "hard"
  },
  {
    id: 40,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides a dedicated private network connection from an on-premises data center to AWS?",
    options: [
      "AWS VPN only",
      "AWS Direct Connect",
      "Amazon CloudFront",
      "Amazon API Gateway"
    ],
    correct: 1,
    explanation: "AWS Direct Connect provides dedicated private connectivity to AWS.",
    difficulty: "hard"
  },
  {
    id: 41,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service helps developers build, deploy, and manage APIs at scale?",
    options: [
      "Amazon API Gateway",
      "AWS Artifact",
      "Amazon EFS",
      "AWS Organizations"
    ],
    correct: 0,
    explanation: "Amazon API Gateway is a managed service for creating, publishing, and monitoring APIs.",
    difficulty: "medium"
  },
  {
    id: 42,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides user sign-up, sign-in, and access control for web and mobile applications?",
    options: [
      "Amazon Cognito",
      "AWS Batch",
      "Amazon EventBridge",
      "AWS Backup"
    ],
    correct: 0,
    explanation: "Amazon Cognito provides identity, authentication, and user management for applications.",
    difficulty: "hard"
  },
  {
    id: 43,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "A company wants to archive data for long-term retention at very low cost. Which Amazon S3 storage class is most appropriate?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Glacier Deep Archive",
      "S3 Standard-IA"
    ],
    correct: 2,
    explanation: "S3 Glacier Deep Archive is designed for long-term retention with very low storage cost.",
    difficulty: "hard"
  },
  {
    id: 44,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service provides managed desktop-as-a-service in the cloud?",
    options: [
      "Amazon WorkSpaces",
      "Amazon EC2",
      "Amazon AppFlow",
      "Amazon Aurora"
    ],
    correct: 0,
    explanation: "Amazon WorkSpaces is a managed virtual desktop service.",
    difficulty: "medium"
  },
  {
    id: 45,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS tool provides an estimate of monthly charges for a planned architecture before resources are deployed?",
    options: [
      "AWS Pricing Calculator",
      "AWS Budgets",
      "Cost Explorer",
      "AWS Trusted Advisor"
    ],
    correct: 0,
    explanation: "The AWS Pricing Calculator is used to estimate costs before deployment.",
    difficulty: "medium"
  },
  {
    id: 46,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS service or tool lets a company set custom cost and usage thresholds and receive alerts when those thresholds are exceeded?",
    options: [
      "AWS Budgets",
      "Amazon CloudWatch",
      "AWS Support",
      "AWS IAM"
    ],
    correct: 0,
    explanation: "AWS Budgets allows customers to define cost, usage, and reservation budgets with alerting.",
    difficulty: "medium"
  },
  {
    id: 47,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which tool helps visualize, understand, and manage AWS costs and usage over time?",
    options: [
      "AWS Cost Explorer",
      "AWS Artifact",
      "Amazon Inspector",
      "AWS License Manager"
    ],
    correct: 0,
    explanation: "Cost Explorer provides cost and usage analysis with filtering and visualization.",
    difficulty: "medium"
  },
  {
    id: 48,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS Support plan includes architectural guidance, use case guidance, and faster response times than Developer Support?",
    options: [
      "Basic",
      "Developer",
      "Business",
      "Free Tier"
    ],
    correct: 2,
    explanation: "Business Support includes faster response times and broader support features than Developer Support.",
    difficulty: "medium"
  },
  {
    id: 49,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS Support plan is included at no additional charge with every AWS account?",
    options: [
      "Basic",
      "Developer",
      "Business",
      "Enterprise On-Ramp"
    ],
    correct: 0,
    explanation: "Basic Support is included with all AWS accounts.",
    difficulty: "easy"
  },
  {
    id: 50,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which purchasing option allows customers to bid on spare AWS compute capacity at steep discounts, with the possibility of interruption?",
    options: [
      "On-Demand Instances",
      "Reserved Instances",
      "Spot Instances",
      "Dedicated Hosts"
    ],
    correct: 2,
    explanation: "Spot Instances use spare capacity at discounted prices but can be interrupted by AWS.",
    difficulty: "hard"
  },
  {
    id: 51,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS feature helps identify opportunities to reduce costs, improve performance, increase security, and achieve fault tolerance?",
    options: [
      "AWS Trusted Advisor",
      "Amazon Route 53",
      "AWS Artifact",
      "AWS Snowball"
    ],
    correct: 0,
    explanation: "AWS Trusted Advisor provides recommendations in areas such as cost optimization, security, performance, and fault tolerance.",
    difficulty: "medium"
  },
  {
    id: 52,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which statement best describes the AWS Free Tier?",
    options: [
      "All AWS services are always free",
      "It provides limited free usage for eligible services and periods",
      "It gives unlimited production support",
      "It replaces all billing alerts"
    ],
    correct: 1,
    explanation: "The AWS Free Tier offers limited free usage subject to service-specific conditions.",
    difficulty: "easy"
  },
  {
    id: 53,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "A company wants one consolidated bill for multiple AWS accounts. Which AWS service supports this requirement?",
    options: [
      "AWS Organizations",
      "Amazon GuardDuty",
      "AWS WAF",
      "Amazon Macie"
    ],
    correct: 0,
    explanation: "AWS Organizations supports consolidated billing across multiple AWS accounts.",
    difficulty: "medium"
  },
  {
    id: 54,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "Which AWS support resource contains a collection of self-service FAQs, technical documentation, and troubleshooting guides?",
    options: [
      "AWS Knowledge Center and documentation",
      "Amazon Chime",
      "AWS Snowmobile",
      "Amazon Kinesis"
    ],
    correct: 0,
    explanation: "AWS provides extensive documentation and self-service support resources, including the Knowledge Center.",
    difficulty: "easy"
  },
  {
    id: 55,
    type: "single",
    domain: "Cloud Concepts",
    question: "Which statement best explains the concept of agility in the AWS Cloud?",
    options: [
      "Applications must stay in one Region permanently",
      "Resources can be provisioned quickly, enabling faster experimentation and innovation",
      "All workloads require long approval cycles",
      "Customers must buy hardware before testing ideas"
    ],
    correct: 1,
    explanation: "Agility in the cloud comes from rapidly provisioning resources and experimenting faster.",
    difficulty: "hard"
  },
  {
    id: 56,
    type: "single",
    domain: "Security and Compliance",
    question: "Who is responsible for data classification and determining whether customer data should be encrypted in AWS?",
    options: [
      "AWS only",
      "The customer",
      "The customer's internet provider",
      "The hardware manufacturer"
    ],
    correct: 1,
    explanation: "Under the shared responsibility model, customers are responsible for their data, including classification and many configuration decisions.",
    difficulty: "hard"
  },
  {
    id: 57,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service helps move petabyte-scale data transfer jobs using a truck-delivered device?",
    options: [
      "AWS Snowmobile",
      "AWS DataSync",
      "Amazon S3 Transfer Acceleration",
      "AWS Glue"
    ],
    correct: 0,
    explanation: "AWS Snowmobile is designed for exabyte-scale and petabyte-scale data transfers using a physical transport solution.",
    difficulty: "hard"
  },
  {
    id: 58,
    type: "single",
    domain: "Cloud Technology and Services",
    question: "Which AWS service can be used to automatically scale the number of Amazon EC2 instances based on demand?",
    options: [
      "Amazon EC2 Auto Scaling",
      "Amazon Inspector",
      "AWS Cost Explorer",
      "AWS Artifact"
    ],
    correct: 0,
    explanation: "Amazon EC2 Auto Scaling adjusts the number of EC2 instances according to policies and demand.",
    difficulty: "medium"
  },
  {
    id: 59,
    type: "single",
    domain: "Billing, Pricing, and Support",
    question: "A company wants recommendations specifically to reduce idle and underutilized resources. Which AWS tool should it check first?",
    options: [
      "AWS Trusted Advisor",
      "Amazon Polly",
      "AWS Artifact",
      "AWS Secrets Manager"
    ],
    correct: 0,
    explanation: "Trusted Advisor includes cost optimization checks that can identify idle or underutilized resources.",
    difficulty: "hard"
  },
  {
    id: 60,
    type: "single",
    domain: "Cloud Concepts",
    question: "A company wants to improve workload resiliency by avoiding a single point of failure in one data center. What should it do?",
    options: [
      "Deploy all resources in one Availability Zone",
      "Use multiple Availability Zones",
      "Use one very large EC2 instance",
      "Move all data to a local laptop backup"
    ],
    correct: 1,
    explanation: "Using multiple Availability Zones improves resiliency and availability by reducing single points of failure.",
    difficulty: "medium"
  }
]

function App() {
  const [screen, setScreen] = useState('home')
  const [testMode, setTestMode] = useState(null) // 'quick40' or 'full90'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState([])

  // Filter questions based on test mode
  const selectTestMode = (mode) => {
    const hardAndMediumQuestions = quizData.filter(q => q.difficulty === 'hard' || q.difficulty === 'medium')
    const selectedQuestions = mode === 'quick40' 
      ? hardAndMediumQuestions.slice(0, 25)  // ~40 mins of harder questions
      : quizData  // Full 65 questions for 90 min exam

    setTestMode(mode)
    setQuizQuestions(selectedQuestions)
    setAnswered(new Array(selectedQuestions.length).fill(null))
    setScreen('quiz')
    
    // Set timer: 40 minutes = 2400 seconds, 90 minutes = 5400 seconds
    const timeInSeconds = mode === 'quick40' ? 2400 : 5400
    setTimeRemaining(timeInSeconds)
  }

  // Timer effect
  useEffect(() => {
    if (screen === 'quiz' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setScreen('results')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [screen, timeRemaining])

  const handleStartQuiz = () => {
    setScreen('mode-select')
  }

  const handleAnswerClick = (index) => {
    const newAnswered = [...answered]
    newAnswered[currentQuestion] = index
    setAnswered(newAnswered)
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setScreen('results')
    }
  }

  const handleRestart = () => {
    setScreen('home')
    setTestMode(null)
    setCurrentQuestion(0)
    setScore(0)
    setShowExplanation(false)
  }

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">AWS CLF-C02</h1>
          <p className="text-gray-600 mb-2">Cloud Practitioner Practice Exam</p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-8 border border-blue-200">
            <p className="text-lg font-semibold text-gray-900">{quizData.length} Questions</p>
            <p className="text-sm text-gray-600 mt-1">Test your AWS knowledge</p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 shadow-lg mb-4"
          >
            Start Quiz
          </button>
          
          <p className="text-sm text-gray-500">Pass score: 70% or higher</p>
        </div>
      </div>
    )
  }

  if (screen === 'mode-select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Select Test Mode</h1>
          <p className="text-gray-600 mb-8">Choose how you want to practice</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 40 Minute Mode */}
            <button
              onClick={() => selectTestMode('quick40')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-8 text-center transition transform hover:scale-105 shadow-lg"
            >
              <div className="text-5xl font-bold mb-4">40</div>
              <h3 className="text-2xl font-bold mb-2">Minutes</h3>
              <p className="text-blue-100 mb-4">Mixed difficulty practice</p>
              <div className="text-sm text-blue-100">
                <p>📊 ~25 questions</p>
                <p>🎯 Hard & Medium</p>
                <p>⚡ Quick assessment</p>
              </div>
            </button>

            {/* 90 Minute Mode */}
            <button
              onClick={() => selectTestMode('full90')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-8 text-center transition transform hover:scale-105 shadow-lg"
            >
              <div className="text-5xl font-bold mb-4">90</div>
              <h3 className="text-2xl font-bold mb-2">Minutes</h3>
              <p className="text-purple-100 mb-4">Full exam simulation</p>
              <div className="text-sm text-purple-100">
                <p>📊 65 questions</p>
                <p>🎯 All difficulties</p>
                <p>🏆 Real exam experience</p>
              </div>
            </button>
          </div>

          <button
            onClick={() => setScreen('home')}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'quiz') {
    const question = quizQuestions[currentQuestion]
    const hasAnswered = answered[currentQuestion] !== null
    const isCorrect = answered[currentQuestion] === question.correct

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-center">
          <div className="max-w-2xl w-full px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setScreen('home')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-blue-600">AWS CLF-C02 Quiz</h1>
            <div className={`text-sm font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-600'}`}>
              ⏱️ {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full px-4 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="mb-8 text-center">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Question {currentQuestion + 1}/{quizQuestions.length}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {question.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8 max-w-2xl mx-auto">
              {question.options.map((option, index) => {
                const isSelected = answered[currentQuestion] === index
                const isCorrectOption = question.correct === index
                
                let bgColor = 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                let textColor = 'text-gray-900'
                
                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    bgColor = 'bg-green-100 border-green-500'
                    textColor = 'text-green-900'
                  } else if (isSelected && !isCorrect) {
                    bgColor = 'bg-red-100 border-red-500'
                    textColor = 'text-red-900'
                  } else if (isCorrectOption) {
                    bgColor = 'bg-green-50 border-green-500'
                    textColor = 'text-green-900'
                  } else {
                    bgColor = 'bg-gray-100 border-gray-300'
                    textColor = 'text-gray-600'
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswerClick(index)}
                    disabled={hasAnswered}
                    className={`w-full p-4 text-left rounded-lg font-medium border-2 transition-all ${bgColor} ${textColor} ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                        isSelected 
                          ? isCorrect 
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : isCorrectOption && showExplanation
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-6 rounded-lg mb-6 border-l-4 max-w-2xl mx-auto ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'}`}>
                <p className={`font-bold text-lg ${isCorrect ? 'text-green-900' : 'text-blue-900'}`}>
                  {isCorrect ? '✓ Correct!' : 'Explanation'}
                </p>
                <p className={`mt-3 ${isCorrect ? 'text-green-800' : 'text-blue-800'} leading-relaxed`}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Buttons */}
            {showExplanation && (
              <div className="flex gap-4 max-w-2xl mx-auto">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion(currentQuestion - 1)
                      setShowExplanation(false)
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'See Results →' : 'Next →'}
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    )
  }

  if (screen === 'results') {
    const percentage = Math.round((score / quizData.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-blue-600">Quiz Results</h1>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
            {/* Score Circle */}
            <div className={`w-40 h-40 rounded-full mx-auto mb-8 flex items-center justify-center text-6xl font-bold ${
              passed 
                ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-600' 
                : 'bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-600'
            }`}>
              {percentage}%
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {passed ? '🎉 Excellent!' : '📚 Good Effort!'}
            </h2>
            
            <p className="text-xl text-gray-700 mb-2">
              You got <span className="font-bold text-blue-600">{score} out of {quizData.length}</span> questions correct
            </p>

            {/* Performance Bar */}
            <div className="mb-8 text-left">
              <p className="text-sm text-gray-600 mb-2 font-medium">Performance</p>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className={`p-6 rounded-lg mb-8 ${passed ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className={`text-lg font-semibold ${passed ? 'text-green-900' : 'text-yellow-900'}`}>
                {passed 
                  ? '✓ You\'re ready for the AWS Cloud Practitioner exam!' 
                  : '→ Review the topics and try again to improve your score.'}
              </p>
            </div>

            {/* Question Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">{score}</div>
                <p className="text-sm text-blue-700">Correct</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-1">{quizData.length - score}</div>
                <p className="text-sm text-red-700">Incorrect</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">{quizData.length}</div>
                <p className="text-sm text-purple-700">Total</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRestart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
              >
                Retake Quiz
              </button>
              
              <button
                onClick={() => setScreen('home')}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
