import React from 'react'
import { Link } from 'react-router-dom'
function PrivatepolicyScreen() {

   
   

    return (
        <div className="PrivatepolicyScreen Describe">
            <div class="maxWidth">
                <div class="topTitle">Privacy Policy</div>
                <div class="topCont">
                    <p>This notice outlines our general policy on Privacy and Fair Processing.</p>
                    <p>For more information about the legal terms and conditions that may apply to your use of our websites please refer to our:</p>
                    <ul>
                        <li>Website Terms and Conditions (Including the Cookies Policy)</li>
                        <li>Our Third Party Providers</li>
                    </ul>
                    <p>We appreciate the trust you place in us when sharing your personal data. The security of that data is very important to us. In this Notice, we will explain how Autosqueak collect, use and protect your personal data.</p>
                    <p>We will also outline what rights you have with regards to your personal data and how you can exercise those rights.</p>
                    <h2><strong>Who we are</strong></h2>
                    <p>Autosqueak Ltd is a data controller and processor.</p>
                    <p>Our registered office address is:</p>
                    <p>Autosqueak Ltd,</p>
                    <p>Nexus,</p>
                    <p>Discovery Lane,</p>
                    <p>Leeds LS23 AA</p>
                    <h2><strong>Why does Autosqueak collect and store personal data?</strong></h2>
                    <p>In order for us to provide you with a service we need to collect personal data for correspondence purposes and/or service provision.</p>
                    <p>We are committed to ensuring that the information we collect, and use is appropriate for this purpose, and does not constitute an invasion of your privacy.</p>
                    <p>In the course of dealing with you, we may pass your personal data on to our service providers who are contracted to Autosqueak. Our contractors are obliged to keep your details securely, and use them only to fulfil the service they provide you on our behalf. Once your service need has been satisfied, they will dispose of the details in line with Autosqueak’s procedures.</p>
                    <h2><strong>Categories of information</strong></h2>
                    <p>The categories of information we collect may include, but are not limited to, those set out below:</p>
                    <ul>
                        <li>Your contact information;</li>
                        <li>Information about your visit to our website stored on your device using cookies (please view our Cookies Policy);</li>
                        <li>Information necessary for us to provide you with a service;</li>
                        <li>Information about your business;</li>
                        <li>Any other information that you choose to send us</li>
                    </ul>
                    <h2><strong>Uses of Your Information</strong></h2>
                    <p>Autosqueak will process – that means collect, store and use – the information you provide in a manner that is compatible with the UK General Data Protection Regulation (GDPR) and the Data Protection Act 2018. We will endeavour to keep your information accurate and up to date. We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
                    <p>Our aim is not to be intrusive or ask irrelevant or unnecessary questions. Moreover, the information you provide will be subject to rigorous measures and procedures to minimise the risk of unauthorised access or disclosure.</p>
                    <p>We may use your information in the following ways:</p>
                    <ul>
                        <li>To carry out any steps required before entering into a contract with you or with a third party;</li>
                        <li>To provide a service to you;</li>
                        <li>When you provide services to us;</li>
                        <li>To comply with our legal responsibilities;</li>
                        <li>To respond to requests you put to us;</li>
                        <li>To provide you with information regarding services and products we provide;</li>
                        <li>As part of our recruitment process;</li>
                        <li>To ensure that content from our website is presented in the most effective manner on your device.</li>
                    </ul>
                    <h2><strong>Purpose and legal basis for processing</strong></h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                    <p>Generally, we do not rely on consent as a lawful basis for processing your personal data, other than in relation to:</p>
                    <ul>
                        <li>Sending direct marketing communications to you (in circumstances in which we are not relying upon legitimate interests); or</li>
                        <li>Processing special categories of personal data which you choose to provide to us as part of the employee or franchisee recruitment process.</li>
                    </ul>
                    <h2><strong>Who has access to your data?</strong></h2>
                    <p>Autosqueak will have access to your data for the purposes listed above. Where third parties are involved in the process they will be bound by terms of confidentiality and this Notice (please view our Third Party Providers list for more detail);</p>
                    <h2><strong>Your data rights</strong></h2>
                    <p>Please be aware that you are under no obligation to provide us with your personal information. However, failure to do so may, in some circumstances, prevent us from being able to provide you with products and services, or otherwise interact with you.</p>
                    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include:</p>
                    <ul>
                        <li>Your right of access</li>
                        <li>Your right to rectification</li>
                        <li>Your right to erasure</li>
                        <li>Your right to restriction of processing</li>
                        <li>Your right to object to processing</li>
                        <li>Your right to data portability</li>
                        <li>Your right to withdraw consent</li>
                    </ul>
                    <h2><strong>Complaints</strong></h2>
                    <p>Should you feel unsatisfied with our handling of your data, or about any complaint that you have made to us about our handling of your data, you are entitled to escalate your complaint to a supervisory authority within the European Union. For the United Kingdom, this is the Information Commissioner’s Office (ICO), who is also our lead supervisory authority. Its contact information can be found at https://ico.org.uk/.</p>
                </div>
            </div>
            <div style={{'background-color':' rgb(135, 200, 210)'}}>
                <div class="maxWidth flex secctBtn">
                    <div class="title">Check Out Our Products</div>
                    <div class="btns"><Link to="/">Shop Now</Link></div>
                </div>
            </div>
        </div>

    )
}

export default PrivatepolicyScreen