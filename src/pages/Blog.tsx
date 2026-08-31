import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 16,
    title: "Day 1 as a QA Lead: How I Approach a System I've Never Tested Before",
    excerpt: "Today I start as a QA Lead on a digital health system I've never seen. Not a \"here's the perfect QA process\" article — this is the reconnaissance plan I'm actually walking in with, written before I know whether it works.",
    date: "September 1, 2026",
    readTime: "29 min read",
    category: "QA & Testing",
    imageUrl: "/qa-lead-day-one.jpg",
    content: `
<p>Today is Day 1.</p>

<p>New company.</p>

<p>New team.</p>

<p>New product.</p>

<p>New domain.</p>

<p>New codebase.</p>

<p>And somewhere in the middle of all of that, I am expected to do what QA engineers do best:</p>

<p><strong>Figure out how to break things before users do.</strong> 😂</p>

<p>Except there's one small problem.</p>

<p>I don't know the system yet.</p>

<p>And honestly?</p>

<p>I think that's exactly where the real QA work begins.</p>

<p>I'm joining a team working on digital health systems, and there is a good chance I'll also get involved with other internal systems along the way.</p>

<p>So instead of walking in on Day 1 thinking:</p>

<blockquote><p>"Where are the test cases?"</p></blockquote>

<p>I'm going in thinking:</p>

<blockquote><p><strong>"What the hell does this system actually do?"</strong></p></blockquote>

<p>Because I've learned something over the years.</p>

<p>You cannot test a system properly if you don't understand it.</p>

<p>You can execute 500 test cases.</p>

<p>You can automate 1,000 scenarios.</p>

<p>You can have beautiful reports.</p>

<p>And still completely miss the thing that actually matters.</p>

<p>So this article is basically me documenting the approach I'm taking as I step into this role.</p>

<p>Not a "here is the perfect QA process" article.</p>

<p>Not a "I've mastered digital health" article.</p>

<p>I haven't.</p>

<p>😂</p>

<p>This is more like:</p>

<blockquote><p><strong>Here's how I'm going to figure it out.</strong></p></blockquote>

<p>And I'm going to come back to this later and see what I got right, what I got wrong, and what I completely underestimated.</p>

<h2>Rule #1: Don't test what you don't understand</h2>

<p>This sounds obvious.</p>

<p>But I think it's one of the easiest mistakes to make when joining a new project.</p>

<p>You get a Jira ticket.</p>

<p>You read the acceptance criteria.</p>

<p>You write some test cases.</p>

<p>You execute them.</p>

<p>Everything passes.</p>

<p>Great.</p>

<p>Except...</p>

<p><strong>Do you actually know whether the requirement makes sense?</strong></p>

<p>Do you understand why the feature exists?</p>

<p>Do you understand who uses it?</p>

<p>Do you understand what happens before the feature?</p>

<p>What happens after?</p>

<p>What other systems depend on it?</p>

<p>What happens when it fails?</p>

<p>What data does it touch?</p>

<p>What happens in the real world?</p>

<p>That's the stuff I'm interested in.</p>

<p>My first objective isn't going to be:</p>

<p><strong>"How many test cases can I execute?"</strong></p>

<p>It's:</p>

<p><strong>"How much of this system can I understand?"</strong></p>

<h2>My first week is reconnaissance</h2>

<p>I'm thinking about the first week almost like a reconnaissance mission.</p>

<p>Before I start changing anything, automating anything or creating some beautiful QA dashboard nobody asked for...</p>

<p>I want to map the territory.</p>

<p>The first things I want to understand are:</p>

<pre><code class="language-text">Product
  ↓
Users
  ↓
Workflows
  ↓
Architecture
  ↓
Data
  ↓
Integrations
  ↓
Risks
  ↓
Testing strategy
  ↓
Automation
</code></pre>

<p>And importantly, I don't want to understand these things separately.</p>

<p>I want to understand how they connect.</p>

<h2>1. Start with the product, not the code</h2>

<p>The codebase is tempting.</p>

<p>Especially as someone who enjoys development.</p>

<p>You open the repository.</p>

<p>You see the stack.</p>

<p>You see the folders.</p>

<p>You see the APIs.</p>

<p>You immediately start thinking:</p>

<blockquote><p>"I can probably automate this."</p></blockquote>

<p>Not yet.</p>

<p>First, I want to understand the product.</p>

<p>What problem is it solving?</p>

<p>Who uses it?</p>

<p>Why do they use it?</p>

<p>What does a normal day look like for a user?</p>

<p>What does a successful workflow look like?</p>

<p>What does failure look like?</p>

<p>What are the most important things the system does?</p>

<p>What would happen if those things stopped working?</p>

<p>That's where I'm starting.</p>

<h2>2. Find the users</h2>

<p>One of the first things I want to build is a simple map of the users and their responsibilities.</p>

<p>For example, a digital health system might involve different actors such as:</p>

<pre><code class="language-text">Patient
   ↓
Healthcare Worker
   ↓
Facility
   ↓
Supervisor
   ↓
Administrator
   ↓
External System
</code></pre>

<p>The exact roles obviously depend on the product.</p>

<p>But the principle is the same.</p>

<p>I want to know:</p>

<p><strong>Who is allowed to do what?</strong></p>

<p>Because permissions aren't just a security concern.</p>

<p>They're a testing concern.</p>

<p>If User A can see information that should only be available to User B, that's a defect.</p>

<p>If a clinician can perform an administrative action they shouldn't have access to, that's a defect.</p>

<p>If a user loses permissions but their existing session can still perform privileged actions, that's a defect.</p>

<p>So understanding the roles early gives me an entire testing dimension.</p>

<h2>3. Map the critical workflows</h2>

<p>This is probably one of the first actual artefacts I want to create.</p>

<p>Not 200 test cases.</p>

<p>A <strong>workflow map.</strong></p>

<p>Something like:</p>

<pre><code class="language-text">User Login
    ↓
Patient Search
    ↓
Patient Selection
    ↓
Consultation
    ↓
Clinical Data Capture
    ↓
Save
    ↓
Submit
    ↓
Review
    ↓
Referral / Treatment / Follow-up
</code></pre>

<p>Obviously, the real system may look completely different.</p>

<p>That's the point.</p>

<p>I need to discover what the real workflow looks like.</p>

<p>Then I can ask:</p>

<blockquote><p>Which steps are critical?</p></blockquote>

<blockquote><p>Which steps change data?</p></blockquote>

<blockquote><p>Which steps communicate with another system?</p></blockquote>

<blockquote><p>Which steps can fail silently?</p></blockquote>

<blockquote><p>Which steps have regulatory or privacy implications?</p></blockquote>

<blockquote><p>Which steps would cause serious problems if they were wrong?</p></blockquote>

<p>That's where testing starts becoming <strong>risk-based</strong> rather than just requirement-based.</p>

<h2>4. Follow the data</h2>

<p>This is something I'm particularly interested in with digital health systems.</p>

<p>Don't just follow the user.</p>

<p><strong>Follow the data.</strong></p>

<p>Imagine a patient record.</p>

<p>Where does it originate?</p>

<p>Where is it stored?</p>

<p>Who can modify it?</p>

<p>Who can read it?</p>

<p>Does it get transformed?</p>

<p>Does it get sent somewhere else?</p>

<p>Does another system consume it?</p>

<p>What happens when the data fails validation?</p>

<p>What happens when the receiving system is unavailable?</p>

<p>What happens if the same information is submitted twice?</p>

<p>What happens if the connection drops halfway through?</p>

<p>What happens if the request succeeds but the response is lost?</p>

<p>That's where things get really interesting.</p>

<p>Because in a health system, you're not simply testing:</p>

<blockquote><p>"Does the button work?"</p></blockquote>

<p>You're testing:</p>

<blockquote><p><strong>"Did the right information reach the right place, in the right form, for the right user, without compromising its integrity?"</strong></p></blockquote>

<p>That's a much bigger problem.</p>

<h2>Digital health is not just another CRUD application</h2>

<p>This is probably one of the biggest mindset shifts I'm expecting to make.</p>

<p>At the surface, a digital health application might look familiar.</p>

<p>Forms.</p>

<p>Tables.</p>

<p>Dashboards.</p>

<p>APIs.</p>

<p>Authentication.</p>

<p>Reports.</p>

<p>Notifications.</p>

<p>Basically the same ingredients we've seen in countless enterprise systems.</p>

<p>But the <strong>domain context changes the risk.</strong></p>

<p>A wrong value in an ordinary internal dashboard might be annoying.</p>

<p>A wrong clinical value, patient identity, referral, medication record or diagnostic result can have consequences far beyond the application itself.</p>

<p>That's why <a href="https://www.who.int/health-topics/digital-health" target="_blank" rel="noopener noreferrer">WHO's digital health work</a> places a strong emphasis on interoperability, data sharing, evidence-based implementation and systems that support health outcomes, rather than treating digital health as simply another category of software.</p>

<p>That changes how I think about QA.</p>

<h2>So what does a QA engineer actually need to understand about digital health?</h2>

<p>I'm still learning this myself.</p>

<p>But these are some of the areas I'm going to be looking at.</p>

<h3>Patient identity</h3>

<p>How is a patient identified?</p>

<p>What happens if two records look similar?</p>

<p>Can duplicate patients exist?</p>

<p>What happens when patient information changes?</p>

<p>Can one patient accidentally be associated with another patient's data?</p>

<p>That last one is obviously a <strong>massive</strong> concern.</p>

<h3>Clinical data</h3>

<p>What information is being captured?</p>

<p>What are the valid values?</p>

<p>What are the units?</p>

<p>What are the allowed ranges?</p>

<p>Which fields are mandatory?</p>

<p>Which fields are conditional?</p>

<p>What rules determine whether one field affects another?</p>

<p>This is where domain knowledge becomes extremely important.</p>

<p>The QA engineer needs to understand the business or clinical rules, not just whether the form accepts a value.</p>

<h3>Workflow</h3>

<p>Healthcare isn't always:</p>

<pre><code class="language-text">Create → Read → Update → Delete
</code></pre>

<p>It can be:</p>

<pre><code class="language-text">Register
   ↓
Assess
   ↓
Diagnose
   ↓
Treat
   ↓
Refer
   ↓
Follow up
   ↓
Close
</code></pre>

<p>And those states matter.</p>

<p>A patient shouldn't necessarily be able to jump from one state to another arbitrarily.</p>

<p>So state-transition testing becomes important.</p>

<h2>Interoperability is going to be another big one</h2>

<p>This is one area I definitely want to learn more about.</p>

<p>Healthcare systems rarely exist completely by themselves.</p>

<p>They may need to exchange information with:</p>

<ul>
  <li>EMRs</li>
  <li>laboratory systems</li>
  <li>pharmacy systems</li>
  <li>imaging systems</li>
  <li>national health platforms</li>
  <li>insurance systems</li>
  <li>reporting platforms</li>
  <li>identity systems</li>
  <li>notification services</li>
</ul>

<p>And that's where interoperability comes in.</p>

<p>One standard worth understanding is <strong><a href="https://hl7.org/fhir/" target="_blank" rel="noopener noreferrer">HL7 FHIR</a></strong>, which defines a standard way to represent and exchange healthcare information. FHIR is organised around resources such as Patient, Practitioner, Observation, DiagnosticReport, Medication and many others.</p>

<p>But here's the part that catches people out.</p>

<p>Conformance to FHIR is not the same thing as interoperability.</p>

<p>Two systems can both be perfectly FHIR-conformant and still fail to talk to each other, because FHIR is deliberately flexible about what you're allowed to put in a resource.</p>

<p><strong>That flexibility is exactly why profiles and implementation guides exist.</strong></p>

<p>They narrow the standard down to what two specific systems have actually agreed on.</p>

<p>As a QA engineer, I don't necessarily need to become a clinical informatics expert overnight.</p>

<p>But if the system uses FHIR, I absolutely want to understand:</p>

<pre><code class="language-text">Resource
Profile
StructureDefinition
ValueSet
CodeSystem
Reference
Bundle
API
</code></pre>

<p>And then test the actual implementation against its intended contract.</p>

<p>Because interoperability bugs can be sneaky.</p>

<p>The UI might say:</p>

<blockquote><p>"Referral submitted successfully."</p></blockquote>

<p>But what actually happened?</p>

<p>Did the API send the correct resource?</p>

<p>Was the identifier correct?</p>

<p>Did the receiving system accept it?</p>

<p>Was the response interpreted correctly?</p>

<p>Was the data transformed correctly?</p>

<p>That's QA territory.</p>

<h2>And then there are APIs</h2>

<p>I'm expecting to spend a lot of time here.</p>

<p>For every important workflow, I want to know:</p>

<pre><code class="language-text">UI
 ↓
Frontend
 ↓
API
 ↓
Service
 ↓
Database
 ↓
External system
</code></pre>

<p>And then I want to know what happens in the reverse direction.</p>

<p>Because testing only from the UI can hide a lot.</p>

<p>I want API tests for:</p>

<ul>
  <li>authentication</li>
  <li>authorization</li>
  <li>validation</li>
  <li>expected responses</li>
  <li>error responses</li>
  <li>boundary conditions</li>
  <li>duplicate requests</li>
  <li>malformed payloads</li>
  <li>data integrity</li>
  <li>rate limiting where relevant</li>
  <li>integration failures</li>
</ul>

<p><a href="https://owasp.org/API-Security/" target="_blank" rel="noopener noreferrer">OWASP's API Security Top 10</a> is a useful starting point here, especially around broken object-level authorization, broken authentication, excessive resource consumption, broken function-level authorization and unsafe API consumption.</p>

<p>And for application security more broadly, <a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noopener noreferrer">OWASP ASVS</a> provides a structured basis for testing technical security controls in web applications.</p>

<p>I'm not saying:</p>

<blockquote><p>"Follow OWASP and you're done."</p></blockquote>

<p>Absolutely not.</p>

<p>It's a starting point for asking better questions.</p>

<h2>Then I want to understand the database</h2>

<p>Not necessarily because QA needs to write SQL all day.</p>

<p>But because understanding the data model can reveal things the UI won't.</p>

<p>I want to know:</p>

<ul>
  <li>What are the core entities?</li>
  <li>What are the relationships?</li>
  <li>What fields are unique?</li>
  <li>What fields are nullable?</li>
  <li>What constraints exist?</li>
  <li>What happens on deletion?</li>
  <li>What happens on updates?</li>
  <li>What gets audited?</li>
  <li>What gets soft deleted?</li>
  <li>What gets archived?</li>
  <li>Which tables are sensitive?</li>
  <li>What data is derived rather than directly entered?</li>
</ul>

<p>If I understand the database model, I can start designing better test data.</p>

<p>And better test data means better testing.</p>

<h2>Security and privacy are not optional side quests</h2>

<p>This is especially important in digital health.</p>

<p>Healthcare data is sensitive.</p>

<p>In Kenya, the Data Protection Act specifically addresses personal data relating to health, and the Digital Health Act includes provisions around confidentiality, privacy, security, access controls, accuracy and integrity of sensitive health data.</p>

<p>So as a QA engineer, I want to understand the actual controls implemented in the product.</p>

<p>Things like:</p>

<pre><code class="language-text">Who can access what?

Can users access records they shouldn't?

Can users manipulate IDs to access another patient's record?

Are sensitive fields exposed in API responses?

Are secrets exposed in logs?

Are audit events generated?

Can audit records be modified?

Does logout actually invalidate access?

What happens when a user's permissions change?

Can a user access old data after their access is revoked?
</code></pre>

<p>And this is where API testing, browser testing, database validation and security testing start overlapping.</p>

<h2>Audit trails are another thing I want to understand</h2>

<p>If someone changes important information:</p>

<p><strong>Who changed it?</strong></p>

<p><strong>When?</strong></p>

<p><strong>What changed?</strong></p>

<p><strong>What was the previous value?</strong></p>

<p><strong>What was the new value?</strong></p>

<p><strong>Was the change authorised?</strong></p>

<p>And can the audit record itself be tampered with?</p>

<p>This is one of those areas that might not be visible from the UI at all.</p>

<p>Which is exactly why QA needs to understand the architecture.</p>

<h2>What about offline systems?</h2>

<p>This is another thing I want to investigate if the product has offline capabilities.</p>

<p>And this is a completely different testing problem.</p>

<p>Imagine a healthcare worker captures information while offline.</p>

<p>Then:</p>

<pre><code class="language-text">Device
   ↓
Local storage
   ↓
Network unavailable
   ↓
User continues working
   ↓
Network returns
   ↓
Sync
   ↓
Server
</code></pre>

<p>Now we have a whole new collection of questions.</p>

<p>What happens when the connection drops?</p>

<p>What happens when it comes back?</p>

<p>What if the same record was changed on both sides?</p>

<p>What if sync happens twice?</p>

<p>What if the device runs out of storage?</p>

<p>What if the application is closed during sync?</p>

<p>What if only half the data synchronises?</p>

<p>What happens when two users modify the same record?</p>

<p>That's a whole testing strategy by itself.</p>

<h2>My first-week QA reconnaissance checklist</h2>

<p>So if I had to turn all of this into an actual first-week plan, this is roughly how I'd approach it.</p>

<h3>Day 1: Understand the product</h3>

<p>I want:</p>

<ul>
  <li>Product overview</li>
  <li>Product demo</li>
  <li>User roles</li>
  <li>Major workflows</li>
  <li>Current QA process</li>
  <li>Known pain points</li>
  <li>Known production issues</li>
  <li>Current environments</li>
  <li>Release process</li>
</ul>

<p>And most importantly:</p>

<p><strong>Someone explaining the system to me like I'm completely new to it.</strong></p>

<p>Because I am.</p>

<p>😂</p>

<h3>Day 2: Understand the architecture</h3>

<p>I want to know:</p>

<pre><code class="language-text">Frontend
Backend
Database
APIs
Authentication
External integrations
Queues
Notifications
Storage
CI/CD
Environments
Monitoring
Logging
</code></pre>

<p>I want architecture diagrams if they exist.</p>

<p>If they don't?</p>

<p>I'll probably make one.</p>

<p>Even if it's ugly.</p>

<p>The purpose isn't to impress anyone.</p>

<p>It's to understand the system.</p>

<h3>Day 3: Become a user</h3>

<p>This is important.</p>

<p>I want to actually use the system.</p>

<p>Not just read documentation.</p>

<p>Give me the application.</p>

<p>Let me create something.</p>

<p>Let me modify something.</p>

<p>Let me break something.</p>

<p>Let me make mistakes.</p>

<p>Let me experience the workflow.</p>

<p>Because sometimes the best documentation is:</p>

<p><strong>using the product like a confused user.</strong></p>

<p>😂</p>

<h3>Day 4: Start testing</h3>

<p>Now I can start exploring.</p>

<p>Not necessarily writing hundreds of formal test cases.</p>

<p>I want to explore the critical workflows.</p>

<p>Happy paths.</p>

<p>Negative paths.</p>

<p>Boundary cases.</p>

<p>Permissions.</p>

<p>Error handling.</p>

<p>Data integrity.</p>

<p>Integrations.</p>

<p>Browser behaviour.</p>

<p>And start building a risk picture.</p>

<h3>Day 5: Build the QA baseline</h3>

<p>By the end of the first week, I'd like to have a baseline understanding of:</p>

<pre><code class="language-text">What the system does
Who uses it
What matters most
Where the biggest risks are
How the architecture works
What is currently covered
What isn't covered
What is automated
What isn't
Where the major quality gaps are
</code></pre>

<p>I don't expect to know everything.</p>

<p>That would be unrealistic.</p>

<p>I want enough understanding to know <strong>what I don't know.</strong></p>

<p>That's a much better starting point.</p>

<h2>The conversation I actually want on Day 1</h2>

<p>Everything above is stuff I can work out on my own, given enough time.</p>

<p>But there's one hour in the first week that's worth more than the rest of it combined.</p>

<p>The walkthrough with the lead dev.</p>

<p>Someone sitting next to me, sharing their screen, saying "okay so this is where the patient record gets created, and then this bit calls out to..."</p>

<p>That hour is the highest-bandwidth information transfer I'm going to get.</p>

<p>Documentation tells you what a system is supposed to do.</p>

<p><strong>The person who built it tells you what it actually does.</strong></p>

<p>And most of what I want isn't written down anywhere. It's in their head.</p>

<p>So I want to be deliberate about what I ask.</p>

<h3>The question I care about most</h3>

<p>If I only get one, it's this:</p>

<blockquote><p><strong>"What are you afraid of?"</strong></p></blockquote>

<p>Or the slightly less dramatic version:</p>

<blockquote><p>"What breaks most often?"</p></blockquote>

<p>Because I keep saying I want to do risk-based testing.</p>

<p>But risk-based testing needs somebody to tell you where the risk actually is.</p>

<p>And the lead dev already knows.</p>

<p>They know which module everyone tiptoes around.</p>

<p>They know which integration fails quietly on a Friday.</p>

<p>They know which part of the codebase has a comment that says "don't touch this."</p>

<p>None of that is in Jira. 😂</p>

<p>A few more in the same family:</p>

<pre><code class="language-text">What would you rewrite if you had time?

What was the last production incident, and what caused it?

Which bugs keep coming back?

Which part of this system do you not fully understand yourself?

What do you wish QA would catch that we currently don't?
</code></pre>

<p>That last one matters more than it looks.</p>

<p>It invites the person who builds the thing to tell me what QA is actually for on this team.</p>

<p>Their answer might not match my assumptions at all.</p>

<p>Better to find that out on Day 1 than in month three.</p>

<h3>From a manual testing standpoint</h3>

<p>These are the ones that decide whether I can even start testing this week:</p>

<pre><code class="language-text">Which flows can I safely break, and which must I never touch?

Is there a workflow only one person knows how to run?

Where does the UI report success when the backend actually failed?

What do users complain about most?

Which parts have changed recently?

What is nobody currently testing, and why?
</code></pre>

<p>The third one is my favourite.</p>

<p>Remember the referral example from earlier?</p>

<blockquote><p>"Referral submitted successfully."</p></blockquote>

<p>Every system has a few of those.</p>

<p>Places where the interface is optimistic and the backend is quietly disagreeing.</p>

<p>The developer usually knows exactly where they are.</p>

<h3>From an automation standpoint</h3>

<p>This is where I want very practical answers, because they determine what's realistic:</p>

<pre><code class="language-text">Are there stable test IDs on the frontend, or am I fighting selectors?

Can I get a seeded account for every role?

Is there an OpenAPI or contract spec, and is it generated or hand-maintained?

Can I run against an ephemeral environment, or is staging shared?

How do I reset test data?

How long does the pipeline take now, and how much longer can it get?

What's already automated, and does anyone actually trust it?
</code></pre>

<p>A few of these are worth explaining.</p>

<p><strong>Stable test IDs.</strong> I said earlier not to automate against unstable selectors. This is where you find out whether that's your situation, before you've written 200 tests that break on the next CSS refactor.</p>

<p><strong>Hand-maintained specs.</strong> If the API spec is written by hand rather than generated from the code, it will drift. That's not a criticism, it's just physics. It also means the spec itself becomes something worth testing against reality.</p>

<p><strong>Shared staging.</strong> If everyone tests against the same environment, parallel automated runs will interfere with each other and I'll spend months blaming flaky tests for what is actually a test data collision.</p>

<p><strong>"Does anyone trust it?"</strong> This is the real question about existing automation. A suite that everyone re-runs until it goes green isn't coverage. It's decoration. 😂</p>

<h3>One thing I want to be careful about</h3>

<p>Reading that list back, it's a lot of pointed questions.</p>

<p>And I'm the new QA lead.</p>

<p>Walking into someone's codebase on Day 1 with a checklist can very easily come across as an inspection.</p>

<p>That's not what this is.</p>

<p>So I'm going to ask these like someone who's genuinely curious about the thing they built.</p>

<p>Which is true, because I am.</p>

<p>The goal isn't to find out what's wrong with their system.</p>

<p>It's to find out what they already know, so I don't waste three weeks rediscovering it.</p>

<p>And honestly, the answer I'm most interested in is the one that starts:</p>

<blockquote><p>"Well... technically it's supposed to..."</p></blockquote>

<p>That pause is where the bugs live. 😂</p>

<h2>I'm not just joining a system</h2>

<p>Everything up to this point has been about the product.</p>

<p>Reading it. Poking it. Mapping it. Following the data through it.</p>

<p>And all of that I can do on my own, given enough time and coffee. 😂</p>

<p>But I'm not being hired to be a very well-informed observer.</p>

<p>I'm joining a <strong>team</strong>, and a <strong>process</strong> that already exists without me.</p>

<p>And I nearly wrote this entire article without mentioning either of them.</p>

<p>Which is actually the interesting part.</p>

<p>Because that's the trap, isn't it?</p>

<p>QA people love systems.</p>

<p>And we forget that an organisation is also a system. 😂</p>

<h3>The team I'm actually leading</h3>

<p>I have direct reports. QA interns and juniors.</p>

<p>And honestly, on Day 1 that's probably more urgent than the database schema.</p>

<p>Because here's the thing about somebody who has been on a project for six months:</p>

<blockquote><p><strong>They already know where the bodies are buried.</strong></p></blockquote>

<p>They know which test always fails and just gets re-run.</p>

<p>They know which feature everyone quietly dreads regression testing.</p>

<p>They know the bug they've reported three times that keeps getting closed.</p>

<p>And more often than not, nobody has actually asked them.</p>

<p>I just spent a whole section on getting knowledge out of the lead dev's head.</p>

<p>Same argument. Different people.</p>

<pre><code class="language-text">What are you working on right now?

What takes up most of your week?

What do you keep doing manually that you hate?

What have you been asked to do that never made sense to you?

What would you fix if someone just let you?

What do you want to get better at?
</code></pre>

<p>That last question isn't filler.</p>

<p>I'm supposed to be mentoring these people.</p>

<p>I can't do that if I don't know where they're trying to go.</p>

<p>And realistically? A good chunk of what I want to automate this year is going to be built by them.</p>

<h3>How work actually flows here</h3>

<p>Earlier I said I want QA involved before the code is finished.</p>

<p>I want requirements to be testable.</p>

<p>I want defects to become learning opportunities.</p>

<p>Great. Very inspiring. 😂</p>

<p>But those are all things I want to <strong>change.</strong></p>

<p>And you cannot change a process you haven't mapped.</p>

<p>It's the same rule as the system, just pointed at the organisation:</p>

<blockquote><p><strong>Don't fix what you don't understand.</strong></p></blockquote>

<pre><code class="language-text">When does QA get involved in a piece of work?

What does "done" mean here, and who decides?

Is there a QA sign-off before release?

Who actually has go/no-go authority?

How are defects prioritised, and what severity levels exist?

What happens when something is found late?

How do requirements arrive, and from whom?

Who talks to the client?
</code></pre>

<p>Some of those answers are going to be "we don't really have that."</p>

<p>Which is fine.</p>

<p><strong>"We don't have that" is a finding, not a failure.</strong></p>

<p>But I want to know something is missing, rather than assume it is.</p>

<h3>And then the question I think people skip most</h3>

<p>You walk into a new role carrying your own idea of what a good QA lead does.</p>

<p>Meanwhile, somebody hired you for a reason that lives in their head and may never get said out loud.</p>

<p>So I want to ask directly:</p>

<blockquote><p>"What does good look like at 30 days? At 90?"</p></blockquote>

<blockquote><p>"What made you decide to hire a QA lead now?"</p></blockquote>

<blockquote><p>"What's the thing you're hoping stops happening?"</p></blockquote>

<p>That last one is my favourite.</p>

<p>Because organisations don't usually hire a QA lead when everything is going beautifully.</p>

<p>They hire one after something hurt.</p>

<p>A bad release.</p>

<p>A production incident.</p>

<p>An angry client.</p>

<p>A deadline that quietly went past.</p>

<p>Knowing what that thing was tells me more about the real priorities than any job description ever will.</p>

<p>And it gives me something I genuinely need:</p>

<p>An actual answer to <strong>"so when are we automating?"</strong></p>

<p>Because if I know what success looks like at 90 days, I can explain what happens in weeks one to four, and why.</p>

<p>Instead of just vibes and enthusiasm. 😂</p>

<h3>Why I almost skipped all of this</h3>

<p>I'll be honest about it.</p>

<p>Systems are easier than people.</p>

<p>A database schema doesn't have opinions about you. 😂</p>

<p>But in my experience, QA work rarely fails because somebody misunderstood the architecture.</p>

<p>It fails because nobody agreed what quality meant.</p>

<p>Or who decides when something is ready.</p>

<p>Or whether raising a concern late is welcome or annoying.</p>

<p>So this half of the job matters at least as much as the other half.</p>

<p>Probably more.</p>

<h2>Then comes the question everyone loves...</h2>

<h3>"So when are we automating?"</h3>

<p>😂</p>

<p>This is where I want to be disciplined.</p>

<p>Because automation is exciting.</p>

<p>Especially when you're a QA engineer who likes Playwright.</p>

<p>You see a new system and immediately think:</p>

<blockquote><p>"We need an automation framework."</p></blockquote>

<p>Maybe.</p>

<p>But not yet.</p>

<h2>Don't automate chaos</h2>

<p>If the product is changing every week...</p>

<p>Don't automate everything.</p>

<p>If you don't understand the workflows...</p>

<p>Don't automate everything.</p>

<p>If requirements are unclear...</p>

<p>Don't automate everything.</p>

<p>If the application has unstable selectors...</p>

<p>Don't automate everything.</p>

<p>If you don't know which scenarios are actually valuable...</p>

<p>Definitely don't automate everything.</p>

<p>Because then you don't have an automation strategy.</p>

<p>You have a very expensive collection of flaky scripts.</p>

<p>😂</p>

<h2>My automation approach</h2>

<p>I'd rather go:</p>

<pre><code class="language-text">Understand
   ↓
Risk assess
   ↓
Identify stable critical flows
   ↓
Create manual baseline
   ↓
Automate high-value scenarios
   ↓
Run in CI
   ↓
Monitor failures
   ↓
Maintain
   ↓
Expand coverage
</code></pre>

<p>Automation should follow understanding.</p>

<p>Not the other way around.</p>

<h2>What would I automate first?</h2>

<p>Probably the workflows that are:</p>

<p><strong>High risk + high frequency + relatively stable.</strong></p>

<p>For example:</p>

<pre><code class="language-text">Login
Authentication
Core patient workflows
Critical data capture
Important API contracts
Permission checks
High-value regression scenarios
Key integrations
</code></pre>

<p>But the actual list will depend on the system.</p>

<p>That's the whole point of doing reconnaissance first.</p>

<h2>What would I probably NOT automate first?</h2>

<p>Things like:</p>

<ul>
  <li>constantly changing workflows</li>
  <li>highly visual subjective checks</li>
  <li>unstable features</li>
  <li>scenarios that are faster to test manually</li>
  <li>low-risk functionality</li>
  <li>features that haven't settled yet</li>
</ul>

<p>And definitely not:</p>

<blockquote><p>"Let's automate because management wants 80% coverage."</p></blockquote>

<p>Coverage is useful.</p>

<p>But <strong>meaningful coverage</strong> is what I care about.</p>

<p>I'd rather have 200 reliable tests protecting critical workflows than 2,000 flaky tests that everyone ignores.</p>

<h2>The automation pyramid still matters</h2>

<p>My general mental model is still:</p>

<pre><code class="language-text">             E2E
            /   \\
           /     \\
        API       UI
       /             \\
      /               \\
    Unit / Component
</code></pre>

<p>The lower levels should generally give us fast, focused feedback.</p>

<p>API tests can validate a lot of business behaviour without requiring the browser.</p>

<p>UI tests should focus on critical user journeys.</p>

<p>And end-to-end tests should prove that the important pieces actually work together.</p>

<p>Not every possible scenario needs to go through the UI.</p>

<p>That's how you end up waiting 47 minutes for a pipeline to tell you that a button changed its text. 😂</p>

<h2>But I also want contract testing</h2>

<p>If the system integrates with other systems, this becomes interesting.</p>

<p>If my application expects:</p>

<pre><code class="language-json">{
  "patientId": "123",
  "status": "active"
}
</code></pre>

<p>I don't just want to test that my UI displays something.</p>

<p>I want confidence that the systems agree on the contract.</p>

<p>That's where API schemas, contract tests and interoperability standards become valuable.</p>

<p>And if the system uses FHIR, then conformance to the relevant profiles and implementation guides becomes another dimension to investigate rather than simply testing generic JSON responses. HL7's FHIR specification explicitly includes <a href="https://build.fhir.org/conformance-module.html" target="_blank" rel="noopener noreferrer">conformance concepts</a> such as CapabilityStatements, StructureDefinitions and implementation guides.</p>

<h2>Test environments matter more than people think</h2>

<p>Another thing I want to understand immediately:</p>

<p><strong>Where does testing actually happen?</strong></p>

<pre><code class="language-text">Development
     ↓
QA
     ↓
Staging
     ↓
Production
</code></pre>

<p>Or whatever the actual environment strategy is.</p>

<p>Then:</p>

<p>What data exists in each environment?</p>

<p>Is it synthetic?</p>

<p>Is production-like data used?</p>

<p>How are secrets managed?</p>

<p>How are deployments performed?</p>

<p>How do we reset test data?</p>

<p>How do external integrations behave?</p>

<p>Can we reproduce production issues?</p>

<p>Can we safely test failure scenarios?</p>

<p>A brilliant test strategy running against a terrible test environment is still going to hurt.</p>

<h2>Test data is going to be a project of its own</h2>

<p>Especially for healthcare.</p>

<p>We need realistic enough data to test meaningful scenarios.</p>

<p>But we also need to be extremely careful with sensitive information.</p>

<p>I want to understand:</p>

<ul>
  <li>how test data is created</li>
  <li>whether synthetic data is available</li>
  <li>how data is anonymised</li>
  <li>who can access it</li>
  <li>how long it is retained</li>
  <li>how test data is reset</li>
  <li>whether production data ever reaches lower environments</li>
</ul>

<p>This is one of those areas where QA, security and data governance overlap.</p>

<h2>Then I want observability</h2>

<p>When a test fails, I don't want:</p>

<blockquote><p>"Expected 200, received 500."</p></blockquote>

<p>Cool.</p>

<p>Why?</p>

<p>😂</p>

<p>I want to know whether we have access to:</p>

<ul>
  <li>application logs</li>
  <li>API logs</li>
  <li>request IDs</li>
  <li>traces</li>
  <li>database errors</li>
  <li>service health</li>
  <li>CI logs</li>
  <li>browser traces</li>
  <li>monitoring dashboards</li>
</ul>

<p>Good observability makes QA dramatically more effective.</p>

<p>Because a failed test should start an investigation, not a guessing game.</p>

<h2>And this is where AI comes back</h2>

<p>You didn't think I was going to let AI escape this article, did you? 😂</p>

<p>We've spent Parts 1 to 4 talking about AI.</p>

<p>I'm starting a new role where I'm going to have to understand a potentially large and unfamiliar system.</p>

<p>I'm absolutely going to use AI.</p>

<p>But I'm going to use it carefully.</p>

<p>Not:</p>

<blockquote><p>"Hey AI, explain this healthcare system."</p></blockquote>

<p>😂</p>

<p>That's not going to work.</p>

<p>Instead, I'll give it <strong>real context</strong>.</p>

<p>Architecture documentation.</p>

<p>API specifications.</p>

<p>Requirements.</p>

<p>User stories.</p>

<p>Non-sensitive technical documentation.</p>

<p>Database schemas where appropriate.</p>

<p>Test results.</p>

<p>Error logs.</p>

<p>Code.</p>

<p>And I'll ask it targeted questions.</p>

<h2>AI as my onboarding partner</h2>

<p>For example:</p>

<blockquote><p>"Here's the architecture diagram. Explain the components and how data moves through the system. Identify anything I should clarify with the architect."</p></blockquote>

<p>Or:</p>

<blockquote><p>"Here is the API documentation. Group the endpoints by business workflow and identify which ones look critical."</p></blockquote>

<p>Or:</p>

<blockquote><p>"Here is the patient registration workflow. Think like a senior QA engineer and identify ambiguities, failure points and questions I should ask."</p></blockquote>

<p>Or:</p>

<blockquote><p>"Here are the existing automated tests. Identify areas with high business risk but low test coverage."</p></blockquote>

<p>That's a much better use of AI.</p>

<p>AI helps me <strong>process information faster</strong>.</p>

<p>It doesn't become the authority on the product.</p>

<h2>And I can build skills around this</h2>

<p>Remember Part 3?</p>

<p>This is exactly where those skills become useful.</p>

<p>I could create something like:</p>

<pre><code class="language-text">digital-health-qa-review
</code></pre>

<p>with instructions to think about:</p>

<pre><code class="language-text">Patient identity
Data integrity
Authorization
Clinical workflows
Auditability
Interoperability
API contracts
Error handling
Offline behaviour
Security
Privacy
Regression risk
</code></pre>

<p>Then every time I review a feature, I don't have to start from scratch.</p>

<p>My AI already knows the questions I want it to ask.</p>

<p>That's where the whole series starts connecting.</p>

<h2>I can even use AI to help me build the automation framework</h2>

<p>Once I understand the system, I can use AI to help with:</p>

<ul>
  <li>framework structure</li>
  <li>Playwright configuration</li>
  <li>fixtures</li>
  <li>Page Objects</li>
  <li>API clients</li>
  <li>test data factories</li>
  <li>environment configuration</li>
  <li>reporting</li>
  <li>CI integration</li>
  <li>reusable utilities</li>
</ul>

<p>But again:</p>

<p><strong>AI writes code. I own the architecture.</strong></p>

<p>That's an important distinction.</p>

<p>I don't want an AI-generated automation framework that nobody understands six months later.</p>

<p>I want a framework that reflects the project's needs.</p>

<h2>My first automation questions</h2>

<p>Before writing the first test, I want answers to these:</p>

<pre><code class="language-text">What are the critical workflows?

What are the most expensive failures?

What is stable?

What changes frequently?

What tests already exist?

What framework is already being used?

What is the team's coding standard?

How are test environments managed?

How is test data created?

How does CI work?

What needs to run on every PR?

What belongs in nightly regression?

What belongs in release validation?

How will failures be triaged?

Who maintains the tests?
</code></pre>

<p>That last question is important.</p>

<p>Because automation without ownership eventually becomes archaeology.</p>

<h2>QA leadership is bigger than testing</h2>

<p>This is something I'm also going into the role with.</p>

<p>As a QA Lead, my job isn't simply:</p>

<blockquote><p>"Make sure the software works."</p></blockquote>

<p>It's also about building the <strong>quality system around the software.</strong></p>

<p>That means thinking about:</p>

<pre><code class="language-text">People
Process
Product
Tools
Automation
Risk
Metrics
Communication
Continuous improvement
</code></pre>

<p>I want developers involved early.</p>

<p>I want requirements to be testable.</p>

<p>I want QA involved before the code is finished.</p>

<p>I want automation to run where it provides value.</p>

<p>I want defects to become learning opportunities.</p>

<p>And I want the team to think about quality as something we build into the product, not something QA checks at the very end.</p>

<h2>What does "good QA" look like to me?</h2>

<p>Not:</p>

<blockquote><p>"We executed 10,000 test cases."</p></blockquote>

<p>Not:</p>

<blockquote><p>"Our automation coverage is 90%."</p></blockquote>

<p>Not:</p>

<blockquote><p>"We found 500 bugs."</p></blockquote>

<p>Those numbers can be useful.</p>

<p>But they're not the whole story.</p>

<p>For me, good QA means:</p>

<p><strong>We understand the product.</strong></p>

<p><strong>We understand the risk.</strong></p>

<p><strong>We know what we're testing and why.</strong></p>

<p><strong>We know what we're not testing and why.</strong></p>

<p><strong>Our automation protects the important stuff.</strong></p>

<p><strong>Our failures give us useful information.</strong></p>

<p><strong>Our defects are found as early as possible.</strong></p>

<p><strong>And when something reaches production, we understand how and why it got there.</strong></p>

<p>That's the goal.</p>

<h2>My first-week checklist</h2>

<p>The days above are the plan. This is the part I'd actually carry around, because it's the stuff I know I'll forget to ask about once I'm deep in a workflow:</p>

<h3>Domain</h3>

<ul>
  <li>What healthcare processes does the system support?</li>
  <li>What terminology do I need to learn?</li>
  <li>What clinical/business rules exist?</li>
  <li>What could go seriously wrong?</li>
</ul>

<h3>Data</h3>

<ul>
  <li>What data is collected?</li>
  <li>Where is it stored?</li>
  <li>Who can access it?</li>
  <li>How does it move through the system?</li>
  <li>What happens when data changes?</li>
  <li>How is test data managed?</li>
</ul>

<h3>Security</h3>

<ul>
  <li>Authentication</li>
  <li>Authorization</li>
  <li>Role permissions</li>
  <li>Sensitive data exposure</li>
  <li>Audit trails</li>
  <li>Session management</li>
  <li>API security</li>
  <li>Logging</li>
</ul>

<h3>QA</h3>

<ul>
  <li>Existing test strategy</li>
  <li>Existing test cases</li>
  <li>Existing automation</li>
  <li>Existing defects</li>
  <li>Production incidents</li>
  <li>Regression coverage</li>
  <li>Test environments</li>
  <li>Test data</li>
</ul>

<h3>Automation</h3>

<ul>
  <li>What is worth automating?</li>
  <li>What is stable?</li>
  <li>What is high risk?</li>
  <li>What should be API tested?</li>
  <li>What should be UI tested?</li>
  <li>What belongs in CI?</li>
  <li>What belongs in regression?</li>
  <li>What should remain manual?</li>
</ul>

<h2>And then there's the part I'm most excited about</h2>

<p>I'm going to document this.</p>

<p>Not just the final automation framework.</p>

<p>Not just the QA strategy.</p>

<p>The actual journey.</p>

<p>What did I learn in Week 1?</p>

<p>What surprised me?</p>

<p>What did I misunderstand?</p>

<p>What was already working?</p>

<p>What was missing?</p>

<p>What did I automate?</p>

<p>What shouldn't I have automated?</p>

<p>What did AI help with?</p>

<p>Where did AI completely hallucinate? 😂</p>

<p>What did I build?</p>

<p>What did I break?</p>

<p>What did I learn about digital health?</p>

<p>And eventually:</p>

<p><strong>Did the strategy actually work?</strong></p>

<p>That's the interesting part.</p>

<h2>I'm not walking in knowing everything</h2>

<p>And honestly, I'm okay with that.</p>

<p>I'm walking into a new environment today with experience in QA, automation, APIs, enterprise systems and development.</p>

<p>But digital health is a domain I'm still going to learn.</p>

<p>There will be terminology I don't know.</p>

<p>Workflows I don't understand.</p>

<p>Architecture decisions I haven't seen before.</p>

<p>Healthcare standards I need to get familiar with.</p>

<p>And probably a few moments where someone explains something and I nod like:</p>

<blockquote><p>"Yeah, absolutely."</p></blockquote>

<p>while internally thinking:</p>

<blockquote><p>"I have no idea what you just said." 😂</p></blockquote>

<p>That's normal.</p>

<p>The trick isn't pretending you know everything.</p>

<p>The trick is knowing <strong>how to learn the system.</strong></p>

<h2>The experiment starts today</h2>

<p>So that's my approach.</p>

<p>I'm going to start with curiosity.</p>

<p>Understand the product.</p>

<p>Understand the users.</p>

<p>Understand the workflows.</p>

<p>Follow the data.</p>

<p>Map the architecture.</p>

<p>Understand the risks.</p>

<p>Establish a QA baseline.</p>

<p>Then build the strategy.</p>

<p>Then automate the right things.</p>

<p>And keep improving it.</p>

<p>I'm not going to walk into the project screaming:</p>

<blockquote><p><strong>"WHERE IS THE PLAYWRIGHT CONFIG?"</strong></p></blockquote>

<p>😂</p>

<p>First, I want to know what deserves to be tested.</p>

<p>Then I'll worry about how we're going to test it.</p>

<p>Because the best automation framework in the world doesn't save you from misunderstanding the product.</p>

<p>And the most beautiful test suite doesn't matter if you're testing the wrong things.</p>

<h2>One final thought</h2>

<p>I think this is one of the biggest differences between <strong>testing software</strong> and <strong>being a QA engineer.</strong></p>

<p>Testing is an activity.</p>

<p>QA is a way of thinking.</p>

<p>Anyone can execute a test case.</p>

<p>The real skill is understanding:</p>

<blockquote><p><strong>What should we test?</strong></p></blockquote>

<blockquote><p><strong>Why does it matter?</strong></p></blockquote>

<blockquote><p><strong>What could go wrong?</strong></p></blockquote>

<blockquote><p><strong>How would we know?</strong></p></blockquote>

<blockquote><p><strong>What should we automate?</strong></p></blockquote>

<blockquote><p><strong>What shouldn't we automate?</strong></p></blockquote>

<blockquote><p><strong>And how do we build a process that keeps getting better?</strong></p></blockquote>

<p>Today, I get to start answering those questions in a completely new environment.</p>

<p>A new system.</p>

<p>A new domain.</p>

<p>A new team.</p>

<p>A new challenge.</p>

<p>And this time, I'm taking you guys with me.</p>

<p>Let's see what we find. 👀</p>

<p><strong>Day 1 starts now.</strong></p>
  `
  },
  {
    id: 15,
    title: "Give Your AI Hands: MCP, Tools and Building Your First AI-Powered QA Workflow",
    excerpt: "Your AI has the brain. It has the skills. It still doesn't have hands. What MCP actually is, how it's different from a skill, and how to sketch your first AI-powered QA workflow.",
    date: "August 31, 2026",
    readTime: "7 min read",
    category: "AI",
    imageUrl: "/ai-mcp-hands.jpg",
    content: `
<p>Okay.</p>

<p>We've been building up to this one.</p>

<p>In Part 1, we talked about AI becoming more than just a chatbot.</p>

<p>In Part 2, we looked at how we can use AI to become better QA engineers and full-stack developers.</p>

<p>In Part 3, we started giving AI specialised skills.</p>

<p>Frontend skills.</p>

<p>UX skills.</p>

<p>QA skills.</p>

<p>Playwright skills.</p>

<p>Browser skills.</p>

<p>Research skills.</p>

<p>Basically, we're slowly building ourselves an AI engineering toolbox.</p>

<p>But there is one problem.</p>

<p>Our AI knows what to do.</p>

<p>It has the skills.</p>

<p>It has the instructions.</p>

<p>It has the brain.</p>

<p>But...</p>

<p><strong>it still doesn't have hands.</strong></p>

<p>😂</p>

<p>That's where MCP comes in.</p>

<h2>So what the hell is MCP?</h2>

<p>You've probably seen the acronym everywhere lately.</p>

<p><strong>MCP.</strong></p>

<p>Model Context Protocol.</p>

<p>And if you've been following AI development, you've probably seen people casually throwing around phrases like:</p>

<blockquote><p>"Just connect it through MCP."</p></blockquote>

<p>And you're sitting there thinking:</p>

<blockquote><p>"Okabro... but what does that actually mean?" 😂</p></blockquote>

<p>Let's make it simple.</p>

<p>At its core, MCP is a standard way for AI applications to connect to external tools and sources of context.</p>

<p>Instead of every AI application needing a completely different integration for every service, MCP gives them a common protocol for discovering and using capabilities.</p>

<p>The official MCP ecosystem describes it as a protocol for connecting AI applications to tools, resources and other context.</p>

<p>Think about it like this:</p>

<pre><code class="language-text">                    AI
                     │
                     │
                    MCP
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
    GitHub         Jira        Playwright
       │             │             │
       ↓             ↓             ↓
     Code          Tickets       Browser
</code></pre>

<p>The AI doesn't magically know how to use GitHub.</p>

<p>It doesn't magically know how to read your Jira board.</p>

<p>It doesn't magically know how to drive a browser.</p>

<p><strong>MCP just gives it a standard way to discover and interact with those capabilities.</strong></p>

<p>And that's where things get interesting.</p>

<h2>Skills vs MCP</h2>

<p>This is probably the most important distinction from Part 3.</p>

<p>A <strong>skill</strong> tells AI:</p>

<blockquote><p><strong>How should I approach this task?</strong></p></blockquote>

<p>An <strong>MCP server</strong> can give AI:</p>

<blockquote><p><strong>What can I actually access or do?</strong></p></blockquote>

<p>For example:</p>

<h3>Skill</h3>

<pre><code class="language-text">senior-qa-review
</code></pre>

<p>might tell AI:</p>

<pre><code class="language-text">Think about:
- happy paths
- negative cases
- boundaries
- authorization
- API behaviour
- data integrity
- concurrency
- regression
</code></pre>

<p>That's the brain and methodology.</p>

<p>Then MCP could give that AI access to:</p>

<pre><code class="language-text">Jira
GitHub
Playwright
Test reports
Postman
Database
CI/CD
</code></pre>

<p>Now we have:</p>

<pre><code class="language-text">        SKILL
          │
    "How to think"
          │
          ↓
         AI
          │
         MCP
          │
    "What I can use"
          │
    ┌─────┼─────┐
    ↓     ↓     ↓
  Jira  GitHub Playwright
</code></pre>

<p><strong>Skills + tools = serious AI workflows.</strong></p>

<h2>So what is an MCP server?</h2>

<p>This is another thing that sounds more complicated than it is.</p>

<p>An MCP server is basically an application that exposes capabilities to an MCP client.</p>

<p>Those capabilities can include things like:</p>

<h3>Tools</h3>

<p>Actions the AI can call.</p>

<p>For example:</p>

<pre><code class="language-text">create_bug()
search_jira()
run_tests()
get_pull_request()
query_database()
</code></pre>

<h3>Resources</h3>

<p>Information the AI can read.</p>

<p>For example:</p>

<pre><code class="language-text">project://requirements
project://test-results
project://api-documentation
</code></pre>

<h3>Prompts</h3>

<p>Reusable prompt templates or workflows exposed by the server.</p>

<p>The MCP SDKs support these core concepts directly.</p>

<p>So an MCP server isn't necessarily some giant cloud infrastructure project.</p>

<p>It can literally be a small application sitting on your machine exposing a few useful functions.</p>

<p>And that's where I think developers should start.</p>

<h2>Let's build one</h2>

<p>Because honestly, explaining MCP for 2,000 words without building something would be criminal.</p>

<p>😂</p>

<p>Let's build something that actually makes sense for us.</p>

<h3>A QA MCP server</h3>

<p>Imagine we're working on an application.</p>

<p>We have:</p>

<pre><code class="language-text">Jira
GitHub
Playwright
API tests
Test reports
Documentation
</code></pre>

<p>And we want our AI assistant to investigate a ticket.</p>

<p>We want to be able to say:</p>

<blockquote><p>"Investigate ticket QA-123."</p></blockquote>

<p>And have our AI:</p>

<ol>
  <li>Read the Jira ticket.</li>
  <li>Inspect the linked PR.</li>
  <li>Identify affected areas.</li>
  <li>Run relevant Playwright tests.</li>
  <li>Inspect failures.</li>
  <li>Summarise the risk.</li>
  <li>Suggest additional tests.</li>
</ol>

<p>Now we're talking.</p>

<p>That's an actual workflow.</p>

<h2>Our first MCP tool</h2>

<p>Let's keep the first one ridiculously simple.</p>

<p>Imagine we want a tool called:</p>

<pre><code class="language-text">get_ticket
</code></pre>

<p>The AI gives it:</p>

<pre><code class="language-text">ticket_id: QA-123
</code></pre>

<p>The MCP server talks to Jira.</p>

<p>Jira returns the ticket.</p>

<p>The MCP server gives the result back to the AI.</p>

<p>The flow becomes:</p>

<pre><code class="language-text">You
 ↓
AI
 ↓
MCP
 ↓
Jira
 ↓
MCP
 ↓
AI
 ↓
You
</code></pre>

<p>You didn't copy the Jira ticket.</p>

<p>You didn't paste the acceptance criteria.</p>

<p>You didn't switch browser tabs.</p>

<p>You just asked:</p>

<blockquote><p>"What's QA-123 about?"</p></blockquote>

<p>You stopped going to the information.</p>

<p><strong>Your AI can go and get it.</strong></p>

<p><strong>That's the difference.</strong></p>

<h2>MCP doesn't replace your APIs</h2>

<p>This is another misconception worth clearing up.</p>

<p>If Jira already has an API, why do we need MCP?</p>

<p>Because the problem isn't necessarily:</p>

<blockquote><p>"Can software talk to Jira?"</p></blockquote>

<p>Of course it can.</p>

<p>The problem is:</p>

<blockquote><p><strong>"Can an AI agent discover and use that capability in a standard way?"</strong></p></blockquote>

<p>MCP gives AI applications a common interface for discovering available tools and context.</p>

<p>Your MCP server can essentially act as the bridge between the AI and the systems you already use.</p>

<pre><code class="language-text">                 AI
                  │
                 MCP
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      Jira      GitHub    Playwright
        │         │         │
       API       API       CLI
</code></pre>

<p>The existing APIs don't disappear.</p>

<p>MCP sits above them.</p>

<h2>And this is why MCP is interesting for QA</h2>

<p>Think about what QA actually needs.</p>

<p>We constantly touch ticket management.</p>

<p>Browsers.</p>

<p>APIs.</p>

<p>Databases.</p>

<p>Logs.</p>

<p>Documentation.</p>

<p>The actual application.</p>

<p>And most QA workflows involve stitching all of those things together.</p>

<p>MCP gives us a very interesting opportunity.</p>

<p>Instead of:</p>

<pre><code class="language-text">Open Jira
 ↓
Read ticket
 ↓
Open GitHub
 ↓
Find PR
 ↓
Open CI
 ↓
Check build
 ↓
Open test report
 ↓
Open application
 ↓
Run tests
 ↓
Write bug
</code></pre>

<p>We could eventually have:</p>

<pre><code class="language-text">"Investigate this ticket."
</code></pre>

<p>And let the agent orchestrate the boring parts.</p>

<h2>Imagine your AI QA engineer</h2>

<p>Let's say tomorrow you receive:</p>

<blockquote><p><strong>QA-481: Update employee leave calculation</strong></p></blockquote>

<p>Instead of manually investigating everything, you ask:</p>

<blockquote><p>"Investigate QA-481."</p></blockquote>

<p>Your AI could potentially:</p>

<pre><code class="language-text">Reading ticket...

Affected module:
Leave Management

Linked PR:
#2841

Files changed:
leaveCalculator.ts
leaveService.ts

Potentially affected:
- Leave balance
- Leave accrual
- Leave approval

Existing automated coverage:
17 tests

Running relevant tests...

2 tests failed.

Expected balance: 14
Actual balance: 13

Investigating...

The PR changes the accrual calculation for employees
with partial months.

Recommendation:
- Confirm the intended rounding rule with the ticket author
- Add boundary tests for employees who join mid-month
- Add a regression test for the December to January rollover
</code></pre>

<p>Notice what that is and what it isn't.</p>

<p>It isn't the AI deciding whether the bug is real.</p>

<p>It's the AI doing the twenty minutes of clicking, reading and correlating that you were going to do before you even got to the interesting part.</p>

<p>You still make the call.</p>

<p>You just make it with the context already in front of you.</p>

<h2>Start smaller than that</h2>

<p>I know that example looks ambitious.</p>

<p>Don't start there.</p>

<p>Start with the one thing you look up ten times a day.</p>

<p>For me it was tickets.</p>

<p>One tool.</p>

<pre><code class="language-text">get_ticket
</code></pre>

<p>That's it.</p>

<p>Get that working, actually use it for a week, and you'll immediately know what the second tool should be, because you'll feel the gap.</p>

<p>You'll find yourself saying:</p>

<blockquote><p>"Okay but now it needs to see the PR."</p></blockquote>

<blockquote><p>"Okay but now it needs to run the tests."</p></blockquote>

<blockquote><p>"Okay but now it needs to read the report."</p></blockquote>

<p>And that's how the thing gets built. One annoyance at a time.</p>

<p>Not by designing the perfect QA agent on a whiteboard on day one. 😂</p>

<h2>A word of caution, because someone has to say it</h2>

<p>Giving AI hands is genuinely fun.</p>

<p>It's also the point where mistakes stop being theoretical.</p>

<p>A skill that reasons badly gives you a bad opinion.</p>

<p>A tool that acts badly gives you a bad <strong>action.</strong></p>

<p>So be deliberate about it.</p>

<p>Start read-only. Reading tickets, reading PRs, reading reports — those are hard to regret.</p>

<p>Be careful about the ones that write. Creating tickets, pushing code, touching data, hitting anything that isn't a test environment.</p>

<p>And be very careful about what you connect to production.</p>

<p>The answer isn't to avoid it.</p>

<p>The answer is to give it the same scope you'd give a new engineer on their first week.</p>

<p>Access to what they need. Not the keys to everything.</p>

<h2>So where does this leave us?</h2>

<p>Let's zoom out on the whole series for a second.</p>

<pre><code class="language-text">Part 1  →  AI stops being a chatbot
Part 2  →  You get better at your actual job
Part 3  →  Skills          =  how it thinks
Part 4  →  MCP and tools   =  what it can touch
</code></pre>

<p>The brain came first.</p>

<p>Then the methodology.</p>

<p>Now the hands.</p>

<p>And once your AI can think <em>and</em> reach, the interesting question stops being:</p>

<blockquote><p>"Can AI do this?"</p></blockquote>

<p>and quietly becomes:</p>

<blockquote><p>"What am I still doing manually, and why?"</p></blockquote>

<p>That question is uncomfortable.</p>

<p>It's also the most useful one in engineering right now.</p>

<p>Build the small thing.</p>

<p>Connect one tool.</p>

<p>See what it changes about how you work.</p>

<p>Then come tell me about it. 😂</p>
  `
  },
  {
    id: 14,
    title: "Build Your Own AI Superpowers: The Skills Every Engineer Should Have",
    excerpt: "Stop asking one AI to be good at everything. How to install, call and write your own specialised AI skills for frontend, QA and backend work, and for the parts of the job you keep re-explaining.",
    date: "August 18, 2026",
    readTime: "15 min read",
    category: "AI",
    imageUrl: "/ai-skills-toolbox.jpg",
    content: `
<p>Okay.</p>

<p>We've talked about AI becoming your junior team.</p>

<p>We've talked about using AI to become a better QA engineer and full-stack developer.</p>

<p>So now I think it's time we get into the really fun stuff.</p>

<p><strong>AI skills.</strong></p>

<p>Not the "I know how to use ChatGPT" kind of skills.</p>

<p>I'm talking about actually giving your AI specialised abilities that make it better at the work you're already doing.</p>

<p>Because there is a massive difference between:</p>

<blockquote><p>"AI, make this website look good."</p></blockquote>

<p>and:</p>

<blockquote><p>"Use my frontend design skill, apply modern UI/UX principles, check accessibility, review the responsive behaviour, and then critique your own implementation."</p></blockquote>

<p>That second one is where things start getting interesting.</p>

<p>And this is something I've been experimenting with a lot lately, especially when building frontend projects.</p>

<p>When I was working on projects like:</p>

<ul>
  <li><a href="https://girlieconversations.com" target="_blank" rel="noopener noreferrer">Girlie Conversations</a></li>
  <li><a href="https://hercartexpressessentials.com" target="_blank" rel="noopener noreferrer">HerCart Essentials</a></li>
  <li>my own portfolio at <a href="https://austin.is-a.dev">austin.is-a.dev</a></li>
</ul>

<p>I wasn't just asking AI to write code.</p>

<p>I was using specialised skills for different parts of the process.</p>

<p>Frontend design.</p>

<p>UI/UX.</p>

<p>Visual reviews.</p>

<p>Browser testing.</p>

<p>Documentation.</p>

<p>Brainstorming.</p>

<p>Criticism.</p>

<p>And eventually I realised:</p>

<blockquote><p><strong>Why am I asking one AI to be good at everything when I can give it specialised skills?</strong></p></blockquote>

<p>That's the whole idea behind this article.</p>

<p>Welcome to my AI toolbox. 😂</p>

<h2>First things first: What is an AI skill?</h2>

<p>Let's simplify this.</p>

<p>An AI skill is basically a reusable set of instructions, knowledge, rules and workflows that teaches an AI <strong>how to perform a particular type of task well.</strong></p>

<p>Instead of repeatedly saying:</p>

<blockquote><p>"Please behave like a senior frontend engineer."</p></blockquote>

<blockquote><p>"Please review this UI."</p></blockquote>

<blockquote><p>"Please follow these accessibility rules."</p></blockquote>

<blockquote><p>"Please think about UX."</p></blockquote>

<p>You package that knowledge into something reusable.</p>

<p>Then whenever you need it:</p>

<p><strong>You call the skill.</strong></p>

<p>Here's the way I explain it to people who don't write code.</p>

<p>Imagine you hire someone brilliant. Genuinely brilliant. They've read everything.</p>

<p>But on their first day they don't know that your team always double-checks the mobile layout, or that you have been burned three times by that one flaky payment flow, or that you hate it when someone ships a button with no loading state.</p>

<p>So every single morning you explain it all over again.</p>

<p>Every. Single. Morning. 😂</p>

<p>A skill is just writing it down once so you never have to do that again.</p>

<p>Think about it like having specialists on your team.</p>

<p>You wouldn't expect one developer to be the best:</p>

<ul>
  <li>UI designer</li>
  <li>backend engineer</li>
  <li>QA engineer</li>
  <li>security engineer</li>
  <li>DevOps engineer</li>
  <li>UX researcher</li>
</ul>

<p>at the exact same time.</p>

<p>So why do we expect one generic AI prompt to be amazing at all of these things?</p>

<p>Exactly.</p>

<h2>And here's the part I really like</h2>

<p>You can actually install some of these skills directly from your terminal.</p>

<p>This means you don't have to keep opening a browser, finding some prompt you wrote three months ago, copying it, pasting it into your AI chat and hoping you remembered the latest version.</p>

<p>You know the one. <code>final_prompt_v3_ACTUAL_final.txt</code>. 😂</p>

<p>Your IDE becomes the command centre.</p>

<p>That's how I prefer working with AI now.</p>

<p>I'm already in the project.</p>

<p>I'm already in the terminal.</p>

<p>I'm already writing code.</p>

<p>So why leave?</p>

<h2>Installing your first frontend skill</h2>

<p>Let's start with one I've been using for frontend work:</p>

<h3>Impeccable</h3>

<p>If you're doing frontend development, this is one worth checking out.</p>

<p>The idea is to give your AI a structured set of frontend design and improvement capabilities instead of just asking it:</p>

<blockquote><p>"Make this prettier."</p></blockquote>

<p>😂</p>

<p>And that's important because <strong>pretty does not automatically mean good.</strong></p>

<p>A UI can look beautiful and still have:</p>

<ul>
  <li>terrible hierarchy</li>
  <li>inconsistent spacing</li>
  <li>poor typography</li>
  <li>bad responsive behaviour</li>
  <li>accessibility issues</li>
  <li>confusing interactions</li>
  <li>unnecessary visual noise</li>
</ul>

<p>It's the website equivalent of a very handsome person who cannot hold a conversation.</p>

<p>Impeccable gives your AI a much more structured way of thinking about these problems.</p>

<h4>Install it</h4>

<p>From your project terminal:</p>

<pre><code class="language-bash">npx impeccable install
</code></pre>

<p>It requires <strong>Node.js 22.12+</strong>.</p>

<p>The cool part is that the installer can tailor the build to the AI harness and model you're using.</p>

<p>Once installed, start your agent and initialise it:</p>

<pre><code class="language-text">/impeccable init
</code></pre>

<p>And when you need to update it later:</p>

<pre><code class="language-bash">npx impeccable update
</code></pre>

<p>That's it.</p>

<p>Now instead of having a giant prompt sitting somewhere in your notes, you have a reusable frontend capability available directly in your AI development workflow.</p>

<p>That's the difference between <strong>using a prompt</strong> and <strong>building a workflow.</strong></p>

<h2>So how do I actually use the skill?</h2>

<p>This is where I think people get confused.</p>

<p>Installing a skill doesn't mean the AI is going to magically run it every time you type something.</p>

<p>You need to understand the idea of <strong>invoking or calling a skill.</strong></p>

<p>Depending on the skill and your AI coding harness, that might mean:</p>

<pre><code class="language-text">/skill-name
</code></pre>

<p>or a specific command exposed by the skill.</p>

<p>Or, in some setups, the AI can automatically decide when a skill is relevant based on the skill's instructions.</p>

<p>The exact syntax depends on the skill and the harness you're using.</p>

<p>But conceptually, think:</p>

<pre><code class="language-text">Install skill
      ↓
Initialise/configure skill
      ↓
Open your project
      ↓
Call skill when needed
      ↓
Give it the task
</code></pre>

<p>For example:</p>

<blockquote><p>"Use the Impeccable skill to review this landing page. Focus on visual hierarchy, typography, spacing, responsiveness and accessibility. Don't rewrite the entire page. First identify the biggest problems and explain why they matter."</p></blockquote>

<p>That's much more useful than:</p>

<blockquote><p>"Make my landing page better."</p></blockquote>

<p>One of those gets you a report you can act on.</p>

<p>The other gets you a purple gradient. 😂</p>

<h2>My favourite frontend workflow</h2>

<p>This is where things start getting fun.</p>

<p>Imagine I'm building a new landing page.</p>

<p>I might start with the basic implementation.</p>

<p>Then:</p>

<h3>Step 1</h3>

<p>Ask my frontend skill to review the implementation.</p>

<h3>Step 2</h3>

<p>Ask my UI/UX skill to critique the experience.</p>

<h3>Step 3</h3>

<p>Ask a browser capable AI tool to actually inspect the running website.</p>

<h3>Step 4</h3>

<p>Ask it to test mobile and desktop layouts.</p>

<h3>Step 5</h3>

<p>Fix the issues.</p>

<h3>Step 6</h3>

<p>Run the review again.</p>

<p>So the workflow becomes:</p>

<pre><code class="language-text">Build
  ↓
AI Design Review
  ↓
UX Review
  ↓
Browser Review
  ↓
Fix
  ↓
Review Again
</code></pre>

<p>That is a completely different development experience.</p>

<p>You're effectively creating a little design team around yourself.</p>

<p>And you're still the person making the decisions.</p>

<h2>UI/UX skills</h2>

<p>Another category I think frontend developers should have is a dedicated UI/UX skill.</p>

<p>A good one should help AI think about:</p>

<ul>
  <li>visual hierarchy</li>
  <li>typography</li>
  <li>spacing</li>
  <li>colour</li>
  <li>component consistency</li>
  <li>responsive design</li>
  <li>accessibility</li>
  <li>user flows</li>
  <li>interaction patterns</li>
  <li>empty states</li>
  <li>loading states</li>
  <li>error states</li>
</ul>

<p>This is where something like a UI/UX Pro Max style skill becomes useful.</p>

<p>The important part is that we're giving AI <strong>a framework for evaluating design.</strong></p>

<p>Otherwise you get:</p>

<blockquote><p>"This looks modern."</p></blockquote>

<p>Okay.</p>

<p>According to who? 😂</p>

<p>A proper skill should be able to explain:</p>

<blockquote><p>"The CTA doesn't have enough visual prominence."</p></blockquote>

<blockquote><p>"The hierarchy between the heading and supporting text is weak."</p></blockquote>

<blockquote><p>"This interaction is unclear on mobile."</p></blockquote>

<blockquote><p>"The colour contrast doesn't meet accessibility expectations."</p></blockquote>

<p>Now we're talking.</p>

<h2>Frontend skills should not just build</h2>

<p>This is one of the biggest lessons I've learned.</p>

<p>Don't only use AI to generate the frontend.</p>

<p>Use AI to <strong>criticise the frontend.</strong></p>

<p>There's a massive difference.</p>

<p>If AI creates the page and you immediately accept it, you've essentially asked the same person to build the house and approve their own inspection.</p>

<p>😂</p>

<p>Instead:</p>

<blockquote><p>Build it.</p></blockquote>

<p>Then:</p>

<blockquote><p><strong>Review it.</strong></p></blockquote>

<p>Then:</p>

<blockquote><p><strong>Try to break it.</strong></p></blockquote>

<p>Then:</p>

<blockquote><p><strong>Try to improve it.</strong></p></blockquote>

<p>That's the workflow.</p>

<h2>Browser skills are a cheat code</h2>

<p>This is another one I've been using.</p>

<p>A browser capable AI tool can actually interact with your running application.</p>

<p>Instead of sending a screenshot and asking:</p>

<blockquote><p>"Does this look okay?"</p></blockquote>

<p>you can have AI inspect the actual website.</p>

<p>Navigate.</p>

<p>Click.</p>

<p>Scroll.</p>

<p>Resize.</p>

<p>Check interactions.</p>

<p>Look at states.</p>

<p>Find broken experiences.</p>

<p>I've used workflows like Claude in Chrome for this kind of review.</p>

<p>And it changes the feedback loop completely.</p>

<pre><code class="language-text">Write code
     ↓
Run application
     ↓
Open browser
     ↓
AI explores application
     ↓
Find problems
     ↓
Fix
     ↓
Repeat
</code></pre>

<p>At that point you're getting pretty close to:</p>

<p><strong>AI-assisted exploratory testing.</strong></p>

<p>And as a QA engineer, this is where I start getting excited. 😂</p>

<h2>Grill-me: The skill that tells you your idea might suck</h2>

<p>This is another concept I absolutely love.</p>

<p>Sometimes you don't need AI to build something.</p>

<p>You need AI to tell you whether you should build it at all.</p>

<p>That's where a "grill-me" style skill comes in.</p>

<p>You give it your idea.</p>

<p>Then tell it:</p>

<blockquote><p><strong>Don't encourage me. Challenge me.</strong></p></blockquote>

<p>Ask it:</p>

<ul>
  <li>What am I assuming?</li>
  <li>What could go wrong?</li>
  <li>Who actually needs this?</li>
  <li>What problem am I solving?</li>
  <li>What alternatives exist?</li>
  <li>What am I overengineering?</li>
  <li>What would make this fail?</li>
  <li>What would users hate?</li>
  <li>What am I completely overlooking?</li>
</ul>

<p>This is useful for software.</p>

<p>It's also useful for life.</p>

<p>Because sometimes AI saying:</p>

<blockquote><p>"That's a great idea!"</p></blockquote>

<p>is exactly what you don't need.</p>

<p>You need:</p>

<blockquote><p>"Bro... no." 😂</p></blockquote>

<p>Honestly, this one has saved me more weekends than any amount of generated code.</p>

<h2>And then there's documentation</h2>

<p>Another skill category that I think developers should seriously explore is documentation and research.</p>

<p>Imagine you're implementing something using a library you've never used.</p>

<p>Instead of asking AI from whatever it happens to remember:</p>

<blockquote><p>"How does this library work?"</p></blockquote>

<p>Give it the documentation.</p>

<p>Then ask:</p>

<blockquote><p>"I'm implementing X. Read the documentation and identify the recommended approach. Highlight anything that could cause problems with my implementation."</p></blockquote>

<p>Now AI is working from the <strong>source of truth</strong> instead of guessing.</p>

<p>That's a much better workflow.</p>

<p>And if you're working with rapidly changing technologies, this becomes even more important.</p>

<h2>Now let's bring this into QA</h2>

<p>This is where things get REALLY interesting.</p>

<p>Because QA is full of repeatable reasoning patterns.</p>

<p>We already have:</p>

<ul>
  <li>testing methodologies</li>
  <li>heuristics</li>
  <li>checklists</li>
  <li>risk analysis</li>
  <li>boundary analysis</li>
  <li>exploratory testing</li>
  <li>regression strategies</li>
  <li>API testing patterns</li>
</ul>

<p>Why not teach those to AI?</p>

<p>Imagine creating a skill called:</p>

<pre><code class="language-text">senior-qa-review
</code></pre>

<p>And inside it:</p>

<pre><code class="language-text">Always consider:

Functional behaviour
Negative scenarios
Boundary conditions
Authorization
Authentication
Data integrity
API behaviour
State transitions
Concurrency
Error handling
Regression impact
Security
Performance
Accessibility
Browser behaviour
</code></pre>

<p>Now every time you ask AI to review a feature, it already knows your testing philosophy.</p>

<p>You don't have to paste that context every single time.</p>

<h2>Build a Playwright skill</h2>

<p>This one is particularly useful if you're doing automation.</p>

<p>Let's say your project has specific Playwright conventions.</p>

<p>Maybe you use:</p>

<ul>
  <li>Page Objects</li>
  <li>fixtures</li>
  <li>reusable test data</li>
  <li>specific selectors</li>
  <li>specific naming conventions</li>
  <li>specific assertions</li>
  <li>screenshots on failure</li>
  <li>traces</li>
  <li>tags</li>
  <li>a particular folder structure</li>
</ul>

<p>Don't explain all of this every time.</p>

<p>Create a skill.</p>

<p>Then:</p>

<blockquote><p>"Create Playwright tests for this feature."</p></blockquote>

<p>actually means:</p>

<blockquote><p>"Create Playwright tests <strong>the way we build Playwright tests here.</strong>"</p></blockquote>

<p>That is a massive upgrade.</p>

<p>The skill can encode:</p>

<pre><code class="language-text">Test structure
Naming conventions
Selector strategy
Fixture usage
Assertions
Test data
Retries
Tracing
Screenshots
Reporting
</code></pre>

<p>Now AI isn't just generating tests.</p>

<p>It's generating tests that fit <strong>your ecosystem.</strong></p>

<h2>Backend skills</h2>

<p>The same idea applies to backend development.</p>

<p>Imagine having:</p>

<pre><code class="language-text">backend-review
api-design
database-review
security-review
performance-review
</code></pre>

<p>Each skill has a specific job.</p>

<p>Your backend skill understands:</p>

<ul>
  <li>API conventions</li>
  <li>validation</li>
  <li>error handling</li>
  <li>authentication</li>
  <li>authorization</li>
  <li>logging</li>
  <li>architecture</li>
</ul>

<p>Your database skill understands:</p>

<ul>
  <li>query performance</li>
  <li>indexes</li>
  <li>relationships</li>
  <li>transactions</li>
  <li>data integrity</li>
  <li>migrations</li>
</ul>

<p>Your security skill attacks the implementation.</p>

<p>Now your AI can review the same feature from multiple perspectives.</p>

<p>That's way more powerful than:</p>

<blockquote><p>"Review my backend."</p></blockquote>

<h2>And here's where it gets even better</h2>

<p>You can combine skills.</p>

<p>Imagine you're building a new feature.</p>

<p>You might have:</p>

<pre><code class="language-text">                 NEW FEATURE
                      │
      ┌─────────┬─────┴─────┬─────────┐
      ↓         ↓           ↓         ↓
   Frontend  Backend     Security  Testing
      │         │           │         │
      └─────────┴─────┬─────┴─────────┘
                      ↓
                 Final Review
</code></pre>

<p>Each capability has a different responsibility.</p>

<p>That's basically a virtual engineering team.</p>

<p>And you're orchestrating it from your IDE.</p>

<h2>But how do you create your own skills?</h2>

<p>This is probably the most important part of this entire article.</p>

<p>Because eventually you're going to find yourself thinking:</p>

<blockquote><p>"Why doesn't AI already know how I do this?"</p></blockquote>

<p>Good question.</p>

<p><strong>Teach it.</strong></p>

<p>Start with something repetitive.</p>

<p>Maybe every time you receive a Jira ticket, you do the same analysis.</p>

<p>You:</p>

<ol>
  <li>Read the requirement.</li>
  <li>Identify the affected areas.</li>
  <li>Look for ambiguity.</li>
  <li>Think about edge cases.</li>
  <li>Identify API changes.</li>
  <li>Think about regression impact.</li>
  <li>Create test scenarios.</li>
</ol>

<p>Write that process down.</p>

<p>Congratulations.</p>

<p>You have the beginning of a QA skill.</p>

<h2>My process for creating a skill</h2>

<h3>1. Ask yourself</h3>

<blockquote><p>What do I keep explaining to AI?</p></blockquote>

<p>That's probably a skill.</p>

<h3>2. Write down your process</h3>

<p>Don't try to make it perfect.</p>

<p>Write:</p>

<blockquote><p>"When I review this type of work, I normally check X, Y and Z."</p></blockquote>

<h3>3. Define what good looks like</h3>

<p>This is extremely important.</p>

<p>Tell the AI:</p>

<blockquote><p>A good result should...</p></blockquote>

<p>and:</p>

<blockquote><p>A bad result usually...</p></blockquote>

<p>Now it has something to aim for.</p>

<h3>4. Add your rules</h3>

<p>What should always happen?</p>

<p>What should never happen?</p>

<p>What assumptions should it avoid?</p>

<p>What standards should it follow?</p>

<h3>5. Give it examples</h3>

<p>This is huge.</p>

<p>Give it examples of:</p>

<p><strong>Good</strong></p>

<p>and</p>

<p><strong>Bad.</strong></p>

<p>Examples can communicate things that 50 lines of instructions sometimes can't.</p>

<h3>6. Test it against real work</h3>

<p>Don't test it with:</p>

<blockquote><p>"Give me an example."</p></blockquote>

<p>Give it an actual task.</p>

<p>Something you were going to do anyway.</p>

<p>See what happens.</p>

<h3>7. Keep improving it</h3>

<p>The first version will probably suck.</p>

<p>That's fine.</p>

<p>You use it.</p>

<p>It misses something.</p>

<p>You update it.</p>

<p>It misses something else.</p>

<p>You update it again.</p>

<p>Eventually you have something that actually reflects how you work.</p>

<h2>Your skills can become your engineering muscle memory</h2>

<p>This is the part I find really interesting.</p>

<p>Think about experienced engineers.</p>

<p>A senior QA engineer sees a requirement and immediately thinks:</p>

<blockquote><p>"What happens if this value is null?"</p></blockquote>

<p>A senior frontend engineer sees a design and immediately notices:</p>

<blockquote><p>"This is going to be terrible on mobile."</p></blockquote>

<p>A senior backend engineer sees an endpoint and immediately thinks:</p>

<blockquote><p>"What happens when this gets hammered with concurrent requests?"</p></blockquote>

<p>That's experience.</p>

<p>Nobody taught them that in a course. They got there by shipping something at 2am and watching it fall over. 😂</p>

<p>Skills allow you to encode some of that experience into AI.</p>

<p>So instead of starting from zero every time...</p>

<p>Your AI starts with <strong>your accumulated knowledge and standards.</strong></p>

<p>That's powerful.</p>

<h2>Don't build one giant "everything" skill</h2>

<p>Please don't do this.</p>

<p>😂</p>

<p>Don't create:</p>

<pre><code class="language-text">ultimate-software-engineer-ai-skill-final-v7-really-final
</code></pre>

<p>with 15,000 lines telling AI how to build software, design interfaces, test APIs, deploy Kubernetes, make coffee and solve world peace.</p>

<p>Keep skills focused.</p>

<p>Good:</p>

<pre><code class="language-text">frontend-review
ui-ux-review
playwright
api-testing
security-review
requirements-analysis
grill-me
</code></pre>

<p>Bad:</p>

<pre><code class="language-text">do-everything-engineering
</code></pre>

<p>The whole point is <strong>specialisation.</strong></p>

<h2>And now we get to the really fun part</h2>

<p>Imagine your AI toolbox eventually looking something like this:</p>

<pre><code class="language-text">MY AI TOOLBOX

Frontend
├── frontend-review
├── ui-ux-review
├── accessibility
├── browser-review
└── design-system

Backend
├── api-design
├── database-review
├── security-review
└── performance

QA
├── test-strategy
├── exploratory-testing
├── playwright
├── api-testing
└── defect-analysis

Thinking
├── grill-me
├── requirements-analysis
├── architecture-review
└── research

General
├── documentation
├── code-review
└── planning
</code></pre>

<p>Now notice what happens to the question you start asking.</p>

<p>It stops being:</p>

<blockquote><p>"What's the best AI?"</p></blockquote>

<p>And becomes:</p>

<blockquote><p><strong>"What capability do I need right now?"</strong></p></blockquote>

<p>That's a much better question.</p>

<h2>Your IDE is becoming the command centre</h2>

<p>This is probably my favourite shift.</p>

<p>I'm already in my IDE.</p>

<p>I'm already in the terminal.</p>

<p>I'm already looking at the code.</p>

<p>So instead of constantly jumping between:</p>

<p>Chrome → ChatGPT → Copy → Paste → IDE → Test → Chrome → ChatGPT...</p>

<p>I can start bringing these capabilities <strong>into the development environment.</strong></p>

<p>Install a skill.</p>

<p>Configure it.</p>

<p>Call it.</p>

<p>Use it.</p>

<p>Improve it.</p>

<p>Repeat.</p>

<p>The AI starts becoming part of the project rather than another website sitting beside the project.</p>

<p>And that distinction matters.</p>

<h2>But there's one more thing</h2>

<p>Skills are great.</p>

<p>But skills alone don't give AI access to your world.</p>

<p>A frontend skill can tell AI <strong>how</strong> to review a website.</p>

<p>A QA skill can tell it <strong>how</strong> to test something.</p>

<p>A backend skill can tell it <strong>how</strong> to review an API.</p>

<p>But what if you want AI to actually:</p>

<ul>
  <li>inspect GitHub</li>
  <li>read Jira</li>
  <li>query your database</li>
  <li>run Playwright</li>
  <li>access your documentation</li>
  <li>inspect your browser</li>
  <li>interact with APIs</li>
  <li>check CI/CD</li>
</ul>

<p>Now we need something else.</p>

<p>We need <strong>tools.</strong></p>

<p>And this is where the line between:</p>

<p><strong>skills</strong></p>

<p>and</p>

<p><strong>MCP</strong></p>

<p>starts becoming very interesting.</p>

<p>A skill gives AI the <strong>knowledge and instructions</strong> for how to approach a task.</p>

<p>A tool gives AI the <strong>ability to actually do something.</strong></p>

<p>One is knowing how to drive.</p>

<p>The other is being handed the keys.</p>

<p>Put them together?</p>

<p>Now we're cooking. 🔥</p>

<h2>The real cheat code</h2>

<p>We've spent the last three articles going deeper into this.</p>

<p>First:</p>

<p><strong>AI can become part of your team.</strong></p>

<p>Then:</p>

<p><strong>AI can make you a better engineer.</strong></p>

<p>Now:</p>

<p><strong>You can teach AI how you work.</strong></p>

<p>That's the progression.</p>

<p>Don't just collect prompts.</p>

<p>Build skills.</p>

<p>Don't just ask AI questions.</p>

<p>Give it standards.</p>

<p>Don't just let it generate work.</p>

<p>Give it a process.</p>

<p>Don't just consume AI tooling.</p>

<p><strong>Build your own.</strong></p>

<p>Because eventually everyone is going to have access to the same models.</p>

<p>The advantage won't simply be:</p>

<blockquote><p>"I have Claude."</p></blockquote>

<p>or:</p>

<blockquote><p>"I have ChatGPT."</p></blockquote>

<p>or:</p>

<blockquote><p>"I have Gemini."</p></blockquote>

<p>Everyone will.</p>

<p>The advantage will be:</p>

<blockquote><p><strong>"I've built a system around these models that makes me ridiculously effective."</strong></p></blockquote>

<p>And honestly, that's the bit I'm most excited about.</p>

<h2>One last challenge</h2>

<p>Open your terminal.</p>

<p>Go through the things you do every week.</p>

<p>Look for the repetitive stuff.</p>

<p>The things you keep explaining.</p>

<p>The things you keep checking.</p>

<p>The things you keep prompting.</p>

<p>The things where you have a very specific way of doing things.</p>

<p>Pick <strong>one.</strong></p>

<p>Turn it into a skill.</p>

<p>Use it.</p>

<p>Break it.</p>

<p>Improve it.</p>

<p>Then create another one.</p>

<p>Eventually you'll have something pretty cool.</p>

<p>Not just an AI assistant.</p>

<p>Not just a collection of prompts.</p>

<p>But your own <strong>AI engineering toolbox.</strong></p>

<p>And the funniest part?</p>

<p>The more you teach AI how you work, the more you realise how you work yourself.</p>

<p>You start asking:</p>

<blockquote><p>Why do I always check this?</p></blockquote>

<blockquote><p>Why don't I have a standard for that?</p></blockquote>

<blockquote><p>Why am I doing this manually?</p></blockquote>

<blockquote><p>Could this be automated?</p></blockquote>

<blockquote><p>Could an agent handle this?</p></blockquote>

<p>Half the time you don't even have a good answer. You just always did it that way. 😂</p>

<p>And that's where the next level begins.</p>

<p>Because once your AI has the skills...</p>

<p>we just need to give it <strong>hands.</strong></p>

<p>And that's where we're going next.</p>

<p><em>Part 4: Give Your AI Hands: MCP, Tools and Connecting Your Agent to the Real World</em> 👀</p>
  `
  },
  {
    id: 13,
    title: "AI Cheat Codes for Engineers: How to Become a Better QA + Full-Stack Dev",
    excerpt: "Twelve ways to use AI that make you a sharper engineer instead of a faster copy-paster. Debugging, breaking features, code review, test data and impact analysis.",
    date: "August 18, 2026",
    readTime: "12 min read",
    category: "AI",
    imageUrl: "/ai-cheat-codes.jpg",
    content: `
<p>So we just established that AI is no longer just our little coding buddy. It can actually become part of the team.</p>

<p>Agents. Tools. MCP. Automation. AI employees that can go off and do things while you're busy pretending you understand why that production bug only happens on Tuesdays. 😂</p>

<p>But before we start building our army of AI agents, I think there is something we need to talk about.</p>

<p><strong>You.</strong></p>

<p>Because having access to AI does not automatically make you a better engineer. Actually, if you use it badly, it can make you worse.</p>

<p>You stop debugging because you can ask AI for the fix. You stop reading documentation because you can ask AI to summarize it. You stop thinking about edge cases because AI can generate 50 test cases in five seconds. You stop learning because there is always a machine sitting next to you ready to give you the answer.</p>

<p>And before you know it, you've become really good at copying answers from AI.</p>

<p>That's not the goal.</p>

<p>The goal is to become the engineer who knows <strong>how to use AI to think better, learn faster and ship better software.</strong></p>

<p>So here are some of the AI cheat codes I've been using and experimenting with.</p>

<h2>Cheat Code #1: Stop asking AI to fix things. Ask it to help you debug.</h2>

<p>This one changed the way I use AI.</p>

<p>The easiest thing in the world is to paste an error into ChatGPT and say "fix this." And yes, sometimes it works. But you just skipped the most important part: <strong>understanding what actually went wrong.</strong></p>

<p>Instead, give AI the situation. Tell it:</p>

<pre><code class="language-text">Expected:
The API should return a 200 response.

Actual:
I'm getting a 500.

Context:
This happens only when the user has no assigned department.

What I've already checked:
- Database connection is working
- Endpoint works for users with departments
- Logs show a null reference error
</code></pre>

<p>Then ask:</p>

<blockquote><p>Give me the most likely causes, rank them by probability, and tell me what evidence I should look for to confirm each one.</p></blockquote>

<p>Now you're not asking AI to replace your debugging. You're using it as a <strong>rubber duck that happens to have read half the internet.</strong> 😂</p>

<p>And this is especially useful as a QA. Because good QA isn't just:</p>

<blockquote><p>"The test failed."</p></blockquote>

<p>It's:</p>

<blockquote><p>"The test failed, here's what I think is happening, here's the evidence, and here's where I think we should investigate."</p></blockquote>

<p>AI can help you get there faster.</p>

<h2>Cheat Code #2: Don't ask AI to write test cases. Ask it to break the system.</h2>

<p>This is probably one of my favourite QA use cases.</p>

<p>A requirement says:</p>

<blockquote><p>Users can reset their password using their email address.</p></blockquote>

<p>The lazy AI prompt is "generate test cases for password reset." You'll get:</p>

<ul>
  <li>Valid email</li>
  <li>Invalid email</li>
  <li>Empty email</li>
  <li>Successful reset</li>
  <li>Unsuccessful reset</li>
</ul>

<p>Cool. But let's make AI uncomfortable. Tell it:</p>

<blockquote><p>"You are a senior QA engineer trying to break this feature. Find scenarios that developers are likely to overlook. Think about security, state, concurrency, rate limiting, session handling, expired tokens, reused tokens, enumeration, browser behaviour, API manipulation and unexpected user behaviour."</p></blockquote>

<p>Now we're getting somewhere. Suddenly AI starts asking questions like:</p>

<ul>
  <li>What happens if the reset token is used twice?</li>
  <li>What happens if the token expires while the page is open?</li>
  <li>Can someone determine whether an email exists in the system?</li>
  <li>What happens if multiple reset requests are made?</li>
  <li>Can the password reset endpoint be called directly without going through the UI?</li>
  <li>What happens if the user changes their password while another reset token is still active?</li>
</ul>

<p>Those are much more interesting tests.</p>

<p>The cheat code isn't <strong>"AI writes my test cases."</strong> It's <strong>"AI helps me think of things I might not have thought about."</strong></p>

<p>That's a huge difference.</p>

<h2>Cheat Code #3: Give AI your QA brain</h2>

<p>This is where things get really interesting.</p>

<p>AI doesn't automatically know what <em>you</em> consider important. So teach it. Give it your testing principles. Something like:</p>

<pre><code class="language-text">When reviewing a feature, always consider:

1.  Happy paths
2.  Negative scenarios
3.  Boundary conditions
4.  Permissions and authorization
5.  Data integrity
6.  API behaviour
7.  State transitions
8.  Error handling
9.  Concurrency
10. Regression impact
11. Security
12. Browser and device behaviour
</code></pre>

<p>Now every time you give it a requirement, you're not getting generic AI testing. You're getting testing influenced by <strong>your methodology.</strong></p>

<p>This is one of the things I think people underestimate. The better context you give AI, the better the engineer it can become alongside you.</p>

<h2>Cheat Code #4: Use AI as your senior engineer</h2>

<p>We've all been there. You have to implement something you've never worked with before.</p>

<p>Maybe it's a new library. Maybe it's some weird Next.js behaviour. Maybe it's a database optimisation. Maybe you're looking at a codebase someone apparently designed during a very emotional weekend. 😂</p>

<p>You could ask "explain this to me." But you can do much better. Tell AI:</p>

<blockquote><p>"I'm a developer who understands React, TypeScript and REST APIs but haven't worked with this particular technology. Teach me what I need to know to implement this feature. Start with the mental model, then explain the relevant concepts, then show me a practical implementation. Don't skip the tradeoffs."</p></blockquote>

<p>Now AI knows <strong>what you know</strong>, <strong>what you don't know</strong>, and <strong>what you're trying to accomplish.</strong></p>

<p>That's a completely different interaction. And this is where AI becomes a genuinely good learning tool.</p>

<h2>Cheat Code #5: Don't let AI write your code before you've designed it</h2>

<p>This one is important.</p>

<p>AI is ridiculously good at producing code. That's also the problem. You can say "build me an authentication system" and 30 seconds later you have 500 lines of code.</p>

<p>Congratulations. You now have 500 lines of code you don't fully understand. 😂</p>

<p>Instead, tell AI your approach first. For example:</p>

<blockquote><p>"I'm thinking of handling authentication using X, storing Y, and using Z for authorization. Before I implement this, review my approach. What am I missing? What are the security concerns? What would you change?"</p></blockquote>

<p>Now you're getting architectural feedback. Then you implement. Then ask AI to review the implementation against the original design.</p>

<p>This keeps <strong>you in the driver's seat.</strong> AI becomes your reviewer instead of your replacement.</p>

<h2>Cheat Code #6: Make AI review your code like it hates you</h2>

<p>This is one of the easiest wins.</p>

<p>Don't just ask "review my code." That's too friendly. 😂</p>

<p>Ask:</p>

<blockquote><p><strong>"Review this code like a senior engineer who is actively looking for reasons to reject this PR."</strong></p></blockquote>

<p>Then run different reviews.</p>

<h3>Security review</h3>
<p>Look for authentication, authorization, injection, data exposure and insecure assumptions.</p>

<h3>Performance review</h3>
<p>Identify unnecessary database queries, expensive operations, rendering problems and scalability concerns.</p>

<h3>QA review</h3>
<p>Identify behaviours that could be difficult to test or likely to break.</p>

<h3>Maintainability review</h3>
<p>Assume someone else has to maintain this code for the next five years.</p>

<h3>Evil user review</h3>
<p>Assume the user is actively trying to abuse this feature. What can they do?</p>

<p>Same code. Five different perspectives. You have basically created a mini code review panel.</p>

<h2>Cheat Code #7: Turn AI into your documentation navigator</h2>

<p>Documentation is great. Documentation is also sometimes a 47-page rabbit hole when all you wanted was "how do I configure this one thing?" 😂</p>

<p>Instead of asking AI from memory, give it the official documentation and tell it what you're trying to accomplish. For example:</p>

<blockquote><p>"I'm trying to implement X. Here is the official documentation. Extract only the sections relevant to this implementation. Explain the recommended approach and highlight anything I should be careful about."</p></blockquote>

<p>This is important because <strong>context matters.</strong> You're not saying "AI, tell me how this framework works." You're saying "here is the source of truth, help me navigate it."</p>

<p>That is a much safer way of using AI for technical work.</p>

<h2>Cheat Code #8: Use AI to turn requirements into questions</h2>

<p>This one is extremely useful for QA.</p>

<p>You get a Jira ticket. The requirement looks simple. You read it. You think "yeah, that's probably fine."</p>

<p>Don't do that. Give it to AI and ask:</p>

<blockquote><p>"Review this requirement as a QA engineer. Identify ambiguity, missing acceptance criteria, assumptions, edge cases and questions that should be answered before development starts."</p></blockquote>

<p>Now instead of waiting until testing to discover "wait... what happens if this user doesn't have a department?" you can catch it before the developer writes a single line of code.</p>

<p>That's <strong>shift-left testing with AI.</strong></p>

<p>And honestly, this is where I think AI can make QA significantly better. Not just helping us test faster. Helping us <strong>ask better questions earlier.</strong></p>

<h2>Cheat Code #9: Generate test data that makes you uncomfortable</h2>

<p>Test data is one of those things we underestimate. We create:</p>

<pre><code class="language-text">John Doe
john@gmail.com
Age: 25
Salary: 100,000
</code></pre>

<p>Everything works. Amazing.</p>

<p>Now ask AI:</p>

<blockquote><p>"Generate test data specifically designed to expose weaknesses in this system."</p></blockquote>

<p>And suddenly:</p>

<pre><code class="language-text">Names with unusual characters
Very long strings
Null values
Duplicate records
Negative numbers
Maximum integer values
Dates around midnight
Leap years
Different time zones
Extremely large datasets
Malformed API payloads
Users with conflicting permissions
</code></pre>

<p>That's where testing becomes interesting.</p>

<p>For systems like HRMS, payroll and enterprise applications, this gets even more useful. Because the edge cases aren't always obvious.</p>

<h2>Cheat Code #10: Use AI to understand the codebase before touching it</h2>

<p>This is one I've become increasingly interested in.</p>

<p>You join a project. There are 500 files. Nobody knows where anything is. Someone says "it's actually pretty straightforward."</p>

<p>It isn't. 😂</p>

<p>Before you start changing things, let AI help you map the system. Ask it to identify:</p>

<ul>
  <li>application entry points</li>
  <li>major modules</li>
  <li>API layers</li>
  <li>database interactions</li>
  <li>authentication flow</li>
  <li>state management</li>
  <li>external integrations</li>
  <li>test structure</li>
  <li>deployment pipeline</li>
</ul>

<p>Then ask:</p>

<blockquote><p>"If I change this module, what areas of the application are most likely to be affected?"</p></blockquote>

<p>Now you're thinking about <strong>impact analysis</strong>. And that's extremely useful for both QA and development.</p>

<h2>Cheat Code #11: Use AI to learn from your own mistakes</h2>

<p>This is one I really like.</p>

<p>Let's say you had a production bug. Don't just fix it. Feed AI:</p>

<ul>
  <li>the original requirement</li>
  <li>the implementation</li>
  <li>the bug</li>
  <li>why testing didn't catch it</li>
  <li>the eventual fix</li>
</ul>

<p>Then ask:</p>

<blockquote><p>"What testing or development practice could have prevented this defect? Should we add a regression test? What similar areas of the system should we inspect?"</p></blockquote>

<p>Now you're turning a bug into a <strong>learning opportunity.</strong></p>

<p>Over time, you can start building your own library of failure patterns. And that's where things get really interesting. Because your AI isn't just learning about software in general. It's learning about <strong>the kinds of failures your systems actually have.</strong></p>

<h2>Cheat Code #12: Find the repetitive stuff</h2>

<p>This is probably the biggest cheat code of them all.</p>

<p>Pay attention to what you do every week. If you're doing:</p>

<blockquote><p>Prompt → Copy → Paste → Modify → Run → Repeat</p></blockquote>

<p>over and over again... stop. That's a signal.</p>

<p>Maybe it should become a script. Maybe it should become an automation. Maybe it should become a custom AI workflow. Maybe it should eventually become an agent.</p>

<p>This is exactly how we get from <strong>AI assistant</strong> to <strong>AI employee.</strong></p>

<p>And that's where we start entering the territory I talked about in Part 1.</p>

<h2>But here's the trap</h2>

<p>There's something we need to be careful about. AI makes it incredibly easy to <strong>look productive.</strong></p>

<p>You can generate code faster. Generate tests faster. Write documentation faster. Generate Jira tickets faster. Generate emails faster. Everything is faster.</p>

<p>But faster isn't automatically better. If you don't understand what's being generated, you're accumulating technical debt at machine speed. 😂</p>

<p>And that's why I think the most important AI skill isn't prompting. It's <strong>judgement.</strong></p>

<p>Knowing:</p>

<blockquote>
  <p>When should I trust this?</p>
  <p>When should I verify it?</p>
  <p>What am I missing?</p>
  <p>What assumptions is AI making?</p>
  <p>What context doesn't it have?</p>
  <p>What could go wrong?</p>
</blockquote>

<p>Those are engineering questions.</p>

<h2>The AI skill I actually want to develop</h2>

<p>I'm not trying to become the guy who knows 500 secret ChatGPT prompts. I don't think that's where the long-term advantage is.</p>

<p>I want to become really good at <strong>breaking down problems and knowing where AI can give me leverage.</strong></p>

<ul>
  <li>If I'm stuck debugging something, AI helps me investigate.</li>
  <li>If I'm learning something, AI becomes my tutor.</li>
  <li>If I'm designing something, AI challenges my thinking.</li>
  <li>If I'm testing something, AI helps me find scenarios I might miss.</li>
  <li>If I'm reviewing code, AI gives me another perspective.</li>
  <li>If I'm doing something repetitive, AI helps me automate it.</li>
</ul>

<p>And if I discover a workflow that keeps repeating? That's when I start thinking:</p>

<blockquote><p><strong>"Can I build an agent for this?"</strong></p></blockquote>

<p>That's the progression.</p>

<h2>AI won't replace your engineering brain</h2>

<p>At least, I don't think it should. 😂</p>

<p>The engineers who get the most out of AI aren't necessarily the ones who ask AI to do everything. They're the ones who know <strong>what to give AI and what to keep for themselves.</strong></p>

<p>Let AI handle the repetitive work. Let it generate possibilities. Let it challenge your assumptions. Let it search through huge amounts of information. Let it write the boring first draft. Let it find the edge cases. Let it review your work.</p>

<p>But keep the judgement. Keep the curiosity. Keep the ability to understand the system. Keep the ability to say:</p>

<blockquote><p>"Hold up. That doesn't make sense."</p></blockquote>

<p>Because that little voice is still one of the most valuable tools you have.</p>

<h2>The real cheat code</h2>

<p>If I had to reduce everything in this article to one thing, it would be this:</p>

<blockquote><p><strong>Don't ask yourself "How can I use AI?"</strong></p></blockquote>

<p>Ask:</p>

<blockquote><p><strong>"How can AI make me better at this?"</strong></p></blockquote>

<p>That's a completely different question.</p>

<p>And once you start thinking that way, you'll notice something interesting. You're no longer just using AI. You're <strong>designing workflows around it.</strong></p>

<p>And once you start designing workflows around it, you'll eventually ask "why am I doing these steps manually?"</p>

<p>And that's when things get fun. Because now we're moving from <strong>AI helping me work</strong> to <strong>AI doing the work.</strong></p>

<p>And that... is where we're going next. 👀</p>

<h2>Final thought</h2>

<p>We're probably still very early. A lot of us are experimenting.</p>

<p>Some people are using AI to write emails. Some are using it to write code. Some are building agents that run entire workflows. Some are connecting AI to their tools using MCP. And some of us are still asking ChatGPT "what does this error mean?" 😂</p>

<p>All of that is fine. The important thing is to start.</p>

<p>Experiment. Break things. Build weird little workflows. Give AI access to boring tasks. Figure out what works. Figure out what doesn't.</p>

<p>And most importantly...</p>

<p><strong>Don't just use AI. Learn how to engineer with it.</strong></p>

<p>Because I have a feeling that's going to become one of the most valuable skills we can have as engineers.</p>

<p><em>Part 3: Build Your Own AI Superpowers. The Skills Every Engineer Should Have.</em> 👀</p>
  `
  },
  {
    id: 12,
    title: "AI Is Not Your Copilot Anymore. It's Your Junior Team",
    excerpt: "Most of us still use AI like a smarter Google search. The bigger shift is delegation: agents with tools, context and guardrails, and what MCP means for engineers and QAs.",
    date: "August 18, 2026",
    readTime: "9 min read",
    category: "AI",
    imageUrl: "/ai-junior-team.jpg",
    content: `
<p>Let's be honest. Most of us in tech are still using AI like it's a really smart Google search.</p>

<p>We ask it to explain an error. We paste some code and say <em>"why isn't this working?"</em> We ask it to write a test. We ask it to refactor a function. Then we copy the answer, stare at it for 30 seconds, and move on with our lives.</p>

<p>And don't get me wrong. That's already pretty insane. But I think we're leaving <strong>a ridiculous amount of value on the table.</strong></p>

<p>Because AI has quietly moved from:</p>

<blockquote><p>"Help me do this."</p></blockquote>

<p>to:</p>

<blockquote><p>"Go do this for me."</p></blockquote>

<p>And that distinction is massive.</p>

<h2>The biggest shift isn't AI. It's delegation.</h2>

<p>I've been thinking about AI less as a chatbot and more as a junior engineer sitting somewhere inside my workflow. Not because AI is replacing engineers, but because there are a lot of things engineers do every single day that don't necessarily require <em>an engineer sitting there doing them manually.</em></p>

<p>Think about your average day. You open Jira. You check your tickets. You read requirements. You inspect a PR. You run tests. You investigate failures. You check logs. You hit an API. You compare responses. You write test cases. You update documentation. You create bug reports. You check Slack.</p>

<p>Then you repeat half of this tomorrow. And again on Thursday. And again next sprint.</p>

<p>That's where things get interesting. Because instead of asking:</p>

<blockquote><p>"How can AI help me do my job?"</p></blockquote>

<p>I think the better question is:</p>

<blockquote><p><strong>"Which parts of my job should I stop doing myself?"</strong></p></blockquote>

<p>That's the mindset shift.</p>

<h2>Your first AI employee</h2>

<p>Imagine having an agent whose entire job is <strong>QA recon.</strong></p>

<p>Every morning it checks:</p>

<ul>
  <li>New Jira tickets</li>
  <li>Recently merged PRs</li>
  <li>Changed APIs</li>
  <li>Recent production bugs</li>
  <li>Failed CI pipelines</li>
  <li>Test reports</li>
  <li>Requirements attached to tickets</li>
</ul>

<p>Then it comes back and says:</p>

<blockquote>
  <p><strong>Morning Austin.</strong></p>
  <p>4 PRs were merged overnight. 2 touched payroll calculations. 1 modified the leave API.</p>
  <p>The payroll PR changes a calculation method that currently has 17 automated tests. I recommend running the payroll regression suite before this reaches staging.</p>
  <p>Also, the leave API response schema changed from <code>employeeId</code> to <code>employee_id</code>. Three existing tests may fail.</p>
</blockquote>

<p>Now we're talking. That's no longer autocomplete. That's an <strong>agent doing reconnaissance.</strong></p>

<p>And you can still make the final decision.</p>

<h2>But what's actually an AI agent?</h2>

<p>The easiest way I've found to think about an agent is:</p>

<p><strong>Model + Instructions + Tools + Context + Guardrails</strong></p>

<ul>
  <li>The <strong>model</strong> is the brain.</li>
  <li>The <strong>instructions</strong> tell it how to behave.</li>
  <li>The <strong>tools</strong> allow it to actually do things.</li>
  <li>The <strong>context</strong> gives it the information it needs.</li>
  <li>The <strong>guardrails</strong> stop it from going full Skynet.</li>
</ul>

<p>OpenAI's own guidance follows a very similar foundation: models, tools and instructions are the core pieces, with orchestration and guardrails becoming important as workflows get more complex.</p>

<p>And here's the important bit.</p>

<h3>A chatbot can tell you what to do. An agent can actually do it.</h3>

<p>That's the game we're entering.</p>

<h2>The cheat code: give AI tools</h2>

<p>This is where things get interesting for us as developers and QAs. Imagine giving an AI access to:</p>

<pre><code class="language-text">Jira
GitHub
Postman
Playwright
Your database
CI/CD
Slack
Your documentation
Browser automation
Test reports
</code></pre>

<p>Suddenly the AI isn't sitting there guessing. It can <strong>inspect reality.</strong></p>

<p>That's incredibly important, because one of the biggest problems with using AI for software engineering is context. You can give ChatGPT a 500-line file and ask "what's wrong?" but you're still asking it to reason about a snapshot.</p>

<p>Give an agent access to your repository, test results, API definitions, tickets and logs? Now it has a much better picture of the system. That's when AI starts becoming useful in a completely different way.</p>

<h2>And this is where MCP enters the chat 👀</h2>

<p>If you've been hearing people throw around <strong>MCP</strong> and wondering what everyone is suddenly talking about, you're not alone.</p>

<p>MCP stands for <strong>Model Context Protocol</strong>. The easiest mental model?</p>

<h3>MCP is a standard way of giving AI access to tools and data.</h3>

<p>Instead of building some weird custom integration every time you want an AI system to talk to another application, MCP gives you a common protocol for exposing capabilities to AI applications.</p>

<p>Think:</p>

<pre><code class="language-text">                    AI AGENT
                       │
              ┌────────┴────────┐
              │                 │
             MCP               MCP
              │                 │
       ┌──────┴──────┐   ┌──────┴──────┐
       │             │   │             │
     GitHub        Jira  Playwright  Database
</code></pre>

<p>The agent doesn't need to know every implementation detail. It knows:</p>

<blockquote>
  <p>"I have a tool that can search Jira."</p>
  <p>"I have a tool that can inspect GitHub."</p>
  <p>"I have a tool that can execute browser automation."</p>
</blockquote>

<p>And the protocol has grown well past simply connecting local tools. The current specification includes things like Tasks, MCP Apps, improved authorization and a stateless protocol core designed to make MCP deployments easier to scale.</p>

<h2>So what does this mean for a QA engineer?</h2>

<p>This is where I think things get <strong>really interesting.</strong></p>

<p>We spend a ridiculous amount of time doing investigation. And investigation is exactly the kind of work AI agents can be good at.</p>

<p>Imagine this workflow:</p>

<pre><code class="language-text">Jira Ticket
     ↓
Agent reads requirements
     ↓
Inspect changed PR
     ↓
Identify affected APIs
     ↓
Generate test scenarios
     ↓
Run Playwright tests
     ↓
Inspect failures
     ↓
Check API responses
     ↓
Compare expected vs actual
     ↓
Generate bug report
</code></pre>

<p>And your job becomes:</p>

<p><strong>Review → Challenge → Approve → Decide</strong></p>

<p>instead of:</p>

<p><strong>Click → Copy → Paste → Repeat → Cry</strong> 😂</p>

<h2>Don't automate everything</h2>

<p>Here's where I think people get AI completely wrong. The goal isn't "let's make the agent do absolutely everything and step away." That's how you end up with an extremely confident machine doing extremely stupid things.</p>

<p>The goal is:</p>

<blockquote><p><strong>Automate the boring. Augment the thinking. Keep humans in control of the important decisions.</strong></p></blockquote>

<p>For example, I'd happily let an agent:</p>

<ul>
  <li>generate test cases</li>
  <li>inspect a PR</li>
  <li>run regression tests</li>
  <li>analyze logs</li>
  <li>summarize failures</li>
  <li>search documentation</li>
  <li>identify impacted modules</li>
  <li>prepare a bug report</li>
  <li>suggest edge cases</li>
  <li>monitor CI</li>
</ul>

<p>But I probably don't want it casually:</p>

<ul>
  <li>deploying production</li>
  <li>deleting records</li>
  <li>changing payroll</li>
  <li>approving financial transactions</li>
  <li>modifying security permissions</li>
</ul>

<p>without some kind of approval mechanism.</p>

<p>That's where <strong>guardrails</strong> matter. And MCP's newer authorization work is moving in exactly this direction as these systems become more production-oriented.</p>

<h2>The real skill isn't prompting anymore</h2>

<p>This is probably the biggest thing I want to explore in this series.</p>

<p>Everyone is learning how to write prompts. That's useful. But I think we're moving toward something bigger: <strong>agent design.</strong></p>

<p>The valuable engineer isn't necessarily the person who knows the longest prompt. It's the person who can look at a workflow and say:</p>

<blockquote><p>"This shouldn't require a human to do all of these steps."</p></blockquote>

<p>Then design a system around it. You start thinking about:</p>

<ul>
  <li><strong>What should the agent know?</strong> Context.</li>
  <li><strong>What should the agent be able to do?</strong> Tools.</li>
  <li><strong>What decisions can it make?</strong> Reasoning.</li>
  <li><strong>What decisions require approval?</strong> Guardrails.</li>
  <li><strong>What happens when something goes wrong?</strong> Fallbacks.</li>
  <li><strong>How do we know whether it actually worked?</strong> Evaluation.</li>
</ul>

<p>That's much closer to engineering than prompt engineering.</p>

<h2>Build your own little AI team</h2>

<p>This is the direction I'm personally most interested in. Instead of having <strong>one giant agent that does everything</strong>, you can start thinking in terms of specialized agents.</p>

<p>For example:</p>

<pre><code class="language-text">                  ┌──────────────┐
                  │   AI LEAD    │
                  └──────┬───────┘
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
      QA AGENT       DEV AGENT      RESEARCH AGENT
          │              │              │
       Testing        Coding         Research
          │              │              │
     Playwright        GitHub       Web/Search
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                   HUMAN REVIEW
</code></pre>

<p>Your QA agent doesn't need to know everything. It just needs to be <strong>really good at QA.</strong></p>

<p>Your research agent doesn't need access to your production database. It just needs to find and summarize information.</p>

<p>Your coding agent doesn't need permission to deploy. It needs the tools required to modify code and run tests.</p>

<p>This separation makes the whole system easier to reason about. And much easier to trust.</p>

<h2>What a QA agent actually looks like</h2>

<p>So let's make it concrete. Give it tools:</p>

<ul>
  <li>Jira</li>
  <li>GitHub/Bitbucket</li>
  <li>Playwright</li>
  <li>API client</li>
  <li>Test reports</li>
  <li>Documentation</li>
</ul>

<p>Then give it instructions:</p>

<blockquote>
  <p>You are a senior QA engineer.</p>
  <p>Your job is to identify risk, not simply confirm that requirements work.</p>
  <p>Always consider happy paths, negative scenarios, boundary conditions, authorization, data integrity, API behaviour and regression impact.</p>
  <p>Never assume a requirement is correct simply because it exists.</p>
</blockquote>

<p>Then give it a workflow.</p>

<pre><code class="language-text">1.  Read ticket
2.  Identify requirements
3.  Identify ambiguities
4.  Inspect implementation
5.  Identify impacted areas
6.  Generate test strategy
7.  Generate test cases
8.  Execute available automated tests
9.  Analyze failures
10. Report findings
</code></pre>

<p>Now you've built something useful. Not because the prompt is magical, but because you've given the AI <strong>context + tools + responsibility.</strong></p>

<h2>And here's the bit nobody tells you</h2>

<p>Your agent will suck initially. 😂</p>

<p>It will misunderstand things. It will call the wrong tool. It will generate terrible tests. It will occasionally become very confident about something that is completely wrong.</p>

<p>Welcome to software engineering.</p>

<p>The answer isn't to abandon agents. The answer is to <strong>test the agent too.</strong></p>

<p>Yes. QA the AI.</p>

<p>If we're going to trust agents with engineering work, we need to think about:</p>

<ul>
  <li>accuracy</li>
  <li>reliability</li>
  <li>hallucinations</li>
  <li>tool misuse</li>
  <li>authorization</li>
  <li>prompt injection</li>
  <li>data leakage</li>
  <li>regression</li>
  <li>observability</li>
  <li>evaluation</li>
</ul>

<p>Which, ironically, means QA engineers might be sitting in a pretty interesting position. Because we've spent years asking:</p>

<blockquote><p><strong>"How do we know this system actually works?"</strong></p></blockquote>

<p>Now we're going to have to ask the same question about systems that can reason and act.</p>

<h2>My new rule for AI</h2>

<p>Here's the rule I'm trying to follow:</p>

<blockquote><p><strong>If I do something more than twice, I start wondering whether I should give it to an agent.</strong></p></blockquote>

<p>Not necessarily automate it immediately. Just investigate it.</p>

<p>Because sometimes the best use of AI isn't asking it to write the code. Sometimes it's asking:</p>

<blockquote><p>"How can I redesign this workflow so I don't have to do this manually anymore?"</p></blockquote>

<p>That's a completely different question. And I think that's where we're headed.</p>

<h2>We're just getting started</h2>

<p>This isn't going to be another blog series where I explain what ChatGPT is. We all know what ChatGPT is. 😂</p>

<p>I want to actually build stuff. We're going to look at:</p>

<ul>
  <li>AI workflows for developers</li>
  <li>AI workflows for QA engineers</li>
  <li>Prompting techniques that actually matter</li>
  <li>Building autonomous agents</li>
  <li>MCP from a developer's perspective</li>
  <li>Building our own MCP servers</li>
  <li>Connecting agents to Jira, GitHub and other tools</li>
  <li>Giving agents browser access</li>
  <li>AI-powered Playwright testing</li>
  <li>Agentic API testing</li>
  <li>Multi-agent workflows</li>
  <li>Agent memory</li>
  <li>Guardrails</li>
  <li>Evaluating agents</li>
  <li>Prompt injection and security</li>
  <li>Building a personal AI engineering team</li>
  <li>And eventually, making these things useful enough that they actually save us time</li>
</ul>

<p>Because the future isn't necessarily <strong>AI replacing engineers.</strong> I think it's much more interesting than that. It's:</p>

<blockquote><p><strong>Engineers who know how to build and manage AI systems replacing engineers who refuse to use them.</strong></p></blockquote>

<p>And if you're in tech, that's probably worth paying attention to.</p>

<p>Welcome to the agent era!</p>

<p><em>P.S. If you're still using AI exclusively to explain error messages, you're leaving money on the table.</em></p>
  `
  },
  {
    id: 8,
    title: "How to Bag That QA Automation Dream Job: Cypress Edition",
    excerpt: "Cypress interview prep: project structure, best practices, common questions, CI/CD setup, and how to explain your test architecture clearly.",
    date: "May 20, 2025",
    readTime: "20 min read",
    category: "QA & Testing",
    imageUrl: "/automation.JPG",
    content: `
<p>So Cypress is on the job description.</p>

<p>Here's the thing nobody tells you about QA automation interviews. They are not really testing whether you've memorised the docs. 😂</p>

<p>They're testing whether you've ever had a suite go red at 2am for a reason that wasn't a real bug.</p>

<p>This is everything that actually comes up. Architecture, selectors, mocking, and how you keep a suite alive once it's bigger than twelve tests.</p>

<h2>Why Cypress?</h2>

<p>When they ask why you picked it, "it's popular" is not an answer. 😂</p>

<p>Tie it to the stack:</p>

<ul>
  <li><strong>It runs inside the browser.</strong> Unlike Selenium sitting outside the process, Cypress executes in the same run loop as your app. Faster feedback, fewer timing problems.</li>
  <li><strong>Live debugging.</strong> The Test Runner lets you watch it happen and inspect the DOM at every step.</li>
  <li><strong>It waits for you.</strong> Cypress retries commands until the assertion passes. Which is why <code>cy.wait(3000)</code> should make you uncomfortable.</li>
  <li><strong>Command log.</strong> Every step recorded, so you can see what the page looked like the moment it died.</li>
  <li><strong>JavaScript-first.</strong> If the app is JS or TS, your tests speak the same language as the thing they're testing.</li>
  <li><strong>The local experience is lovely.</strong> Genuinely one of the main reasons teams adopt it.</li>
</ul>

<h2>Best practices they're actually probing for</h2>

<p>Interviewers want to know if you've run a suite in production or just finished a tutorial.</p>

<p>These are the habits that give it away:</p>

<ul>
  <li><strong>Tests must be independent.</strong> No test should depend on state another test left behind. Reset in <code>beforeEach()</code>. A test that only passes when it runs second is a time bomb with a nice green tick on it.</li>
  <li><strong>Use <code>data-cy</code> for selectors.</strong> Never CSS classes, never text a designer might reword. <code>data-cy</code> is a contract that exists only for tests.</li>
  <li><strong>No arbitrary waits.</strong> <code>cy.wait(3000)</code> isn't a fix. It's a symptom. Assert, and let retry-ability do its job.</li>
  <li><strong>Abstract the repeated stuff.</strong> Login, navigation, filling forms. Anything you do in more than two tests belongs in <code>commands.js</code>.</li>
  <li><strong>Keep files focused.</strong> Group by feature, not by type. A file called login should test login. That's it.</li>
  <li><strong>Test at the right layer.</strong> Don't put everything through end to end. Unit for logic, integration for components, end to end for the journeys that would cost you money.</li>
</ul>

<h2>Project structure</h2>

<p>A clear layout is half the battle when someone new joins:</p>

<pre><code class="language-bash">
project-root/
├── cypress/
│   ├── e2e/                         # All test files live here
│   │   ├── auth/
│   │   │   ├── login.cy.js
│   │   │   └── logout.cy.js
│   │   ├── dashboard/
│   │   │   ├── overview.cy.js
│   │   │   └── analytics.cy.js
│   │   └── smoke/                   # Smoke test suite (critical paths only)
│   │       └── smoke.cy.js
│   │
│   ├── fixtures/                    # Static test data (JSON)
│   │   ├── users.json
│   │   └── products.json
│   │
│   ├── pages/                       # Page Object Models
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── BasePage.js              # Shared methods all pages inherit
│   │
│   ├── support/
│   │   ├── commands.js              # Custom Cypress commands
│   │   ├── e2e.js                   # Global hooks (beforeEach, afterEach)
│   │   └── selectors.js             # Centralised data-cy selector map
│   │
│   └── reports/                     # Generated test reports (gitignored)
│
├── cypress.config.js                # Main Cypress configuration
├── .env                             # Environment variables (gitignored)
└── package.json
</code></pre>

<p>Three things worth pointing at in an interview: <strong>smoke tests kept separate</strong> from full regression, <strong>page objects in their own folder</strong>, and a <strong>central selectors file</strong> so you don't have magic strings scattered across forty files.</p>

<h2>The config</h2>

<p>They will ask what goes in here:</p>

<pre><code class="language-js">
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.myapp.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,     // ms before cy.get() times out
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,                     // record video of test runs
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,                    // retry failing tests in CI (cypress run)
      openMode: 0,                   // no retries in interactive mode
    },
    env: {
      apiUrl: 'https://api.staging.myapp.com',
    },
    setupNodeEvents(on, config) {
      // Plugin hooks go here (e.g. code coverage, custom tasks)
      return config;
    },
  },
});
</code></pre>

<p>Call out <code>retries</code> specifically.</p>

<p>It says you think about CI stability without using retries to hide real bugs. That distinction matters and interviewers notice it.</p>

<h2>Page Object Model</h2>

<p>POM separates <em>what</em> you're testing from <em>how</em> you talk to the UI.</p>

<p>Markup changes? You fix one file instead of thirty.</p>

<pre><code class="language-js">
// cypress/pages/LoginPage.js
class LoginPage {
  get emailInput()    { return cy.get('[data-cy=email-input]'); }
  get passwordInput() { return cy.get('[data-cy=password-input]'); }
  get submitButton()  { return cy.get('[data-cy=submit-btn]'); }
  get errorMessage()  { return cy.get('[data-cy=error-message]'); }

  visit() { cy.visit('/login'); }

  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.submitButton.click();
  }

  assertError(message) {
    this.errorMessage.should('be.visible').and('contain', message);
  }
}

export default new LoginPage();
</code></pre>

<pre><code class="language-js">
// cypress/e2e/auth/login.cy.js
import LoginPage from '../../pages/LoginPage';

describe('Login', () => {
  beforeEach(() => LoginPage.visit());

  it('logs in with valid credentials', () => {
    LoginPage.login('user@test.com', 'Password123');
    cy.url().should('include', '/dashboard');
  });

  it('shows error with invalid password', () => {
    LoginPage.login('user@test.com', 'wrongpassword');
    LoginPage.assertError('Invalid credentials');
  });
});
</code></pre>

<p>Specs stay short and readable. The page object holds the messy details.</p>

<h2>The questions that actually come up</h2>

<h3>1. "How do you handle flaky tests?"</h3>

<p>Do not say waits. 😂</p>

<p>Say <strong>assertions and retry-ability</strong>. Cypress keeps retrying until the assertion passes or it times out. Stretch the timeout for a specific element if you genuinely need to:</p>

<pre><code class="language-js">
cy.get('[data-cy=submit-btn]', { timeout: 10000 }).should('be.visible').click();
</code></pre>

<h3>2. "How do you select elements?"</h3>

<p><code>data-cy</code>. Always.</p>

<p>Auto-generated class names are how you end up debugging CI at 2am wondering what changed.</p>

<pre><code class="language-js">
// ❌ Fragile
cy.get('.btn-primary-v2-final')

// ✅ Stable
cy.get('[data-cy=login-button]')
</code></pre>

<h3>3. "How do you avoid logging in for every test?"</h3>

<p>Three answers, and knowing all three is the flex.</p>

<p><strong>Option A, custom command through the UI:</strong></p>

<pre><code class="language-js">
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-cy=email]').type(email);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=submit]').click();
});
</code></pre>

<p><strong>Option B, hit the API directly.</strong> Faster, and your tests stop depending on the login screen:</p>

<pre><code class="language-js">
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token);
  });
});
</code></pre>

<p><strong>Option C, <code>cy.session()</code>.</strong> Cypress caches and restores the session, so you authenticate once for the whole suite:</p>

<pre><code class="language-js">
beforeEach(() => {
  cy.session('user-session', () => {
    cy.loginViaApi('user@test.com', 'pass123');
  });
});
</code></pre>

<h3>4. "How do you handle API calls?"</h3>

<p><code>cy.intercept()</code>. Know this one deeply, because it's the most powerful thing in the toolbox:</p>

<pre><code class="language-js">
// Stub a GET request with fixture data
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');

// Stub with inline data
cy.intercept('POST', '/api/orders', {
  statusCode: 201,
  body: { id: 'order-123', status: 'confirmed' }
}).as('createOrder');

// Spy on a real request without stubbing
cy.intercept('GET', '/api/analytics/**').as('analytics');

// Wait for a request to complete before asserting
cy.visit('/dashboard');
cy.wait('@getUsers');
cy.get('[data-cy=user-list]').should('have.length', 3);

// Assert on the request itself
cy.wait('@createOrder').its('request.body').should('include', { productId: 'p-1' });

// Simulate API failure
cy.intercept('GET', '/api/data', { statusCode: 500, body: 'Server Error' }).as('failedRequest');
</code></pre>

<h3>5. "cy.get() vs cy.find()?"</h3>

<p><code>cy.get()</code> searches from the top of the document. <code>cy.find()</code> searches inside whatever you already have.</p>

<pre><code class="language-js">
cy.get('[data-cy=user-card]').find('[data-cy=user-name]').should('contain', 'Austin');
</code></pre>

<h3>6. "What are aliases for?"</h3>

<pre><code class="language-js">
// Alias a DOM element to avoid re-querying
cy.get('[data-cy=submit-btn]').as('submitBtn');
cy.get('@submitBtn').should('be.disabled');
cy.get('@submitBtn').click();

// Alias a request
cy.intercept('GET', '/api/users').as('users');
cy.wait('@users').its('response.statusCode').should('eq', 200);
</code></pre>

<h3>7. "How do you manage test data?"</h3>

<p>Fixtures for static data. API seeding for dynamic data.</p>

<p>And never, ever point your tests at live production data. If the data can change underneath you, your tests will be flaky and it won't be your fault, which is somehow worse. 😂</p>

<h3>8. "File uploads?"</h3>

<pre><code class="language-js">
// Using cypress-file-upload plugin
cy.get('[data-cy=upload-input]').attachFile('test-document.pdf');
</code></pre>

<h3>9. "Multiple viewports?"</h3>

<pre><code class="language-js">
const viewports = [
  { device: 'mobile', width: 375, height: 812 },
  { device: 'tablet', width: 768, height: 1024 },
  { device: 'desktop', width: 1440, height: 900 },
];

viewports.forEach(({ device, width, height }) => {
  it(\`renders correctly on \${device}\`, () => {
    cy.viewport(width, height);
    cy.visit('/');
    cy.get('[data-cy=nav-menu]').should('be.visible');
  });
});
</code></pre>

<h2>Smoke vs regression vs sanity</h2>

<p>This comes up constantly. Know it cold:</p>

<ul>
  <li><strong>Smoke.</strong> A small fast subset that answers one question: is this thing fundamentally alive? Did it deploy, can people log in, does the homepage load. Runs after every deploy, finishes in under five minutes. If smoke fails, don't bother running the rest.</li>
  <li><strong>Regression.</strong> Everything. Every feature, every edge case. Runs nightly or before a release. Takes 30 to 60 minutes, sometimes a lot more.</li>
  <li><strong>Sanity.</strong> A targeted subset after a specific fix, to check that one thing works without running the world.</li>
</ul>

<pre><code class="language-js">
// cypress/e2e/smoke/smoke.cy.js
describe('[SMOKE] Core User Journeys', () => {
  it('homepage loads', () => {
    cy.visit('/');
    cy.get('[data-cy=hero-section]').should('be.visible');
  });

  it('user can log in', () => {
    cy.login('smoke@test.com', 'SmokePass123');
    cy.url().should('include', '/dashboard');
  });

  it('key API endpoint responds', () => {
    cy.request('GET', '/api/health').its('status').should('eq', 200);
  });
});
</code></pre>

<h2>Headless vs interactive</h2>

<ul>
  <li><strong><code>cypress open</code>.</strong> The Test Runner UI. Watch it run, time-travel through commands, inspect state. This is for you, locally.</li>
  <li><strong><code>cypress run</code>.</strong> No visible browser. Faster, lighter, output to the terminal. This is for CI.</li>
</ul>

<pre><code class="language-bash">
# Interactive - local dev/debug
npx cypress open

# Headless - CI or quick local run
npx cypress run

# Headless, specific browser
npx cypress run --browser chrome

# Run only smoke suite
npx cypress run --spec "cypress/e2e/smoke/**/*.cy.js"
</code></pre>

<h2>Running against different environments</h2>

<p>The same suite should run against dev, staging or production by changing config. Never by editing tests.</p>

<pre><code class="language-bash">
# Override base URL for staging
CYPRESS_BASE_URL=https://staging.myapp.com npx cypress run

# Pass multiple env vars
npx cypress run --env baseUrl=https://staging.myapp.com,apiKey=abc123
</code></pre>

<pre><code class="language-js">
// Access env vars in tests
cy.visit(Cypress.env('baseUrl') || '/');
cy.request({
  url: \`\${Cypress.env('apiUrl')}/users\`,
  headers: { Authorization: \`Bearer \${Cypress.env('apiKey')}\` }
});
</code></pre>

<h2>Reporting</h2>

<p>Terminal output is fine for you and useless for everyone else.</p>

<pre><code class="language-bash">
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
</code></pre>

<pre><code class="language-js">
// cypress.config.js
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
},
</code></pre>

<p>Merge the reports in CI and publish them as build artifacts. Now your manager can see results without asking you.</p>

<p>Which, honestly, is a feature for both of you. 😂</p>

<h2>CI/CD</h2>

<pre><code class="language-yaml">
# .github/workflows/cypress.yml
name: Cypress E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Smoke Tests
        uses: cypress-io/github-action@v6
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
          spec: 'cypress/e2e/smoke/**/*.cy.js'
        env:
          CYPRESS_BASE_URL: \${{ secrets.STAGING_URL }}

      - name: Upload screenshots on failure
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      - name: Upload videos
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos
</code></pre>

<h2>Things worth dropping into the conversation</h2>

<ul>
  <li><strong>cy.session()</strong> for caching auth across tests</li>
  <li><strong>cypress-axe</strong> for accessibility as part of your automation, not a separate afterthought</li>
  <li>The difference between <code>cy.intercept()</code> and the deprecated <code>cy.route()</code></li>
  <li>Cypress's <strong>async nature</strong>. Commands are queued into a chain and then executed, not run line by line as you read them.</li>
  <li><strong>When not to use Cypress.</strong> No multi-tab, no multiple browser contexts. Playwright handles those. Saying this out loud shows you pick tools instead of defending them.</li>
  <li><strong>Component testing.</strong> Cypress can test React, Vue or Angular components in isolation.</li>
  <li><strong>API login vs UI login</strong> and why the API route is faster and less fragile</li>
  <li>A <strong>central selectors file</strong>, so one selector change is one edit</li>
</ul>

<h2>The actual advice</h2>

<p>Here's what I wish someone had told me earlier.</p>

<p>Interviewers care much less about whether you've memorised the API surface, and much more about how you reason about risk.</p>

<p>What would you test first? How would you cut flakiness? How would you structure this for a team of five?</p>

<p>Asking clarifying questions about the product counts for more than naming another Cypress method. 😂</p>

<h2>Before you walk in</h2>

<p>Be ready to talk through project layout, stable selectors, <code>cy.intercept()</code>, custom commands, and smoke versus regression.</p>

<p>And tie every single one of them to a real app you've actually tested.</p>

<p>That's the whole difference between someone who has read about automation and someone who has done it.</p>
    `
  },
  {
    id: 10,
    title: "Playwright: The Power Tool Every Modern QA Engineer Needs (+ How It Stacks Up Against Cypress)",
    excerpt: "How Playwright works, how to structure a project, and when to choose it over Cypress, with code examples and a side-by-side comparison.",
    date: "May 20, 2025",
    readTime: "12 min read",
    category: "QA & Testing",
    imageUrl: "/playwright.jpg",
    content: `
<p>Cypress was my first real automation love. 😂</p>

<p>And then one day someone asked me to test a flow that opened a second tab.</p>

<p>That was the day I learned Cypress does not do second tabs.</p>

<p>So let's talk about Playwright. What it actually does differently, how to structure a project, and when it genuinely beats Cypress.</p>

<h2>What makes Playwright different</h2>

<p>It wasn't bolted onto the modern web. It was built for it.</p>

<ul>
  <li><strong>Multi-browser, properly.</strong> Chromium, Firefox and WebKit. All first-class, all maintained by the same team. Real Safari coverage, not an afterthought.</li>
  <li><strong>It sits outside the browser.</strong> Playwright drives the browser from outside the process, which is exactly why it can handle multiple tabs, multiple contexts and even multiple browsers in a single test.</li>
  <li><strong>Auto-waiting with a checklist.</strong> Before it clicks anything it asks: is this visible, is it enabled, has it stopped animating, is it actually in the viewport?</li>
  <li><strong>Parallel by default.</strong> No config. No paid tier. It just runs your tests in parallel.</li>
  <li><strong>Pick your language.</strong> JavaScript, TypeScript, Python, Java, C#.</li>
</ul>

<p>That second point is the whole thing, honestly. Cypress runs inside your app's run loop, which is what makes its debugging so lovely and also what boxes it in.</p>

<h2>Project structure</h2>

<pre><code class="language-bash">
project-root/
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── dashboard/
│   │   └── overview.spec.ts
│   └── smoke/
│       └── smoke.spec.ts
│
├── pages/                           # Page Object Models
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
│
├── fixtures/                        # Test data
│   └── users.json
│
├── helpers/                         # Utility functions
│   └── auth.helper.ts
│
├── playwright.config.ts             # Main config
├── .env                             # Environment variables
└── package.json
</code></pre>

<h2>The config file</h2>

<pre><code class="language-ts">
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,               // run tests in parallel
  forbidOnly: !!process.env.CI,      // fail CI if test.only is committed
  retries: process.env.CI ? 2 : 0,  // retry on CI only
  workers: process.env.CI ? 4 : 2,  // parallel workers
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'results.xml' }],  // for CI integration
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',         // capture trace on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});
</code></pre>

<p>That <code>projects</code> array is the part worth staring at.</p>

<p>One config, and the same tests run against Chromium, Firefox, WebKit and a mobile profile. Cypress can run multiple browsers too, but here the cross-browser matrix is the design, not a setting you go looking for.</p>

<h2>Page objects</h2>

<pre><code class="language-ts">
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton  = page.getByTestId('submit-btn');
    this.errorMessage  = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertError(message: string) {
    await this.errorMessage.waitFor({ state: 'visible' });
    await this.errorMessage.isVisible();
  }
}
</code></pre>

<pre><code class="language-ts">
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login('user@test.com', 'Password123');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('shows error with invalid credentials', async () => {
    await loginPage.login('user@test.com', 'wrong');
    await loginPage.assertError('Invalid credentials');
  });
});
</code></pre>

<p>Specs stay readable. Selectors live in one place. Same discipline as Cypress, slightly different syntax.</p>

<h2>The things only Playwright does</h2>

<h3>1. Multiple tabs</h3>

<pre><code class="language-ts">
test('link opens in new tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto('/');

  // Wait for new page to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page1.click('[data-testid=external-link]'),
  ]);

  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('expected-url');
});
</code></pre>

<p>This is the one that made me switch for certain projects.</p>

<h3>2. Two users at once</h3>

<pre><code class="language-ts">
test('admin and user see different dashboards', async ({ browser }) => {
  const adminContext = await browser.newContext({ storageState: 'admin-auth.json' });
  const userContext  = await browser.newContext({ storageState: 'user-auth.json' });

  const adminPage = await adminContext.newPage();
  const userPage  = await userContext.newPage();

  await adminPage.goto('/dashboard');
  await userPage.goto('/dashboard');

  await expect(adminPage.getByTestId('admin-panel')).toBeVisible();
  await expect(userPage.getByTestId('admin-panel')).not.toBeVisible();
});
</code></pre>

<p>An admin and a normal user, in the same test, seeing different things.</p>

<p>Try explaining to a product manager why you can't test that. 😂</p>

<h3>3. Log in once, reuse it everywhere</h3>

<pre><code class="language-ts">
// global-setup.ts - runs once before all tests
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('/login');
  await page.fill('[data-testid=email]', 'user@test.com');
  await page.fill('[data-testid=password]', 'pass123');
  await page.click('[data-testid=submit]');

  // Save auth state to file - reused by all tests
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}
</code></pre>

<pre><code class="language-ts">
// playwright.config.ts
globalSetup: './global-setup.ts',
use: {
  storageState: 'auth.json',   // all tests start authenticated
}
</code></pre>

<p>Every test now starts already authenticated. No logging in 200 times.</p>

<h3>4. Network interception</h3>

<pre><code class="language-ts">
// Mock an API response
await page.route('/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Austin' }]),
  });
});

// Abort a request (simulate network failure)
await page.route('/api/analytics', route => route.abort());

// Modify a response
await page.route('/api/config', async route => {
  const response = await route.fetch();
  const body = await response.json();
  body.featureFlag = true;
  route.fulfill({ response, body: JSON.stringify(body) });
});
</code></pre>

<p>Mock it, kill it, or let it through and rewrite the answer on the way back.</p>

<h2>Trace Viewer</h2>

<p>This is genuinely my favourite feature.</p>

<p>When a test dies in CI, Playwright can capture a trace. Actions, network requests, console output, DOM snapshots, all of it.</p>

<pre><code class="language-bash">
npx playwright show-trace trace.zip
</code></pre>

<p>Which means the classic "works on my machine, fails in CI" conversation gets a lot shorter. Video helps, but a trace lets you step through what actually happened.</p>

<h2>Cypress vs Playwright</h2>

<table>
  <thead>
    <tr><th>Feature</th><th>Cypress</th><th>Playwright</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Browser support</strong></td><td>Chrome, Edge, Firefox (limited)</td><td>Chromium, Firefox, WebKit - all first-class</td></tr>
    <tr><td><strong>Multi-tab testing</strong></td><td>Not supported</td><td>Native support</td></tr>
    <tr><td><strong>Multiple browser contexts</strong></td><td>One context per test</td><td>Multiple contexts in one test</td></tr>
    <tr><td><strong>Parallelism</strong></td><td>Paid (Cypress Cloud) or complex setup</td><td>Built-in, free</td></tr>
    <tr><td><strong>Language support</strong></td><td>JavaScript/TypeScript only</td><td>JS/TS, Python, Java, C#</td></tr>
    <tr><td><strong>Developer Experience</strong></td><td>Best-in-class UI</td><td>Great but more code-first</td></tr>
    <tr><td><strong>Debugging</strong></td><td>Time-travel in Test Runner</td><td>Trace Viewer (excellent for CI failures)</td></tr>
    <tr><td><strong>Auto-waiting</strong></td><td>Excellent</td><td>Excellent + actionability checks</td></tr>
    <tr><td><strong>Mobile testing</strong></td><td>Viewport emulation only</td><td>Device emulation + WebKit (real Safari engine)</td></tr>
    <tr><td><strong>Network mocking</strong></td><td>cy.intercept() - excellent</td><td>page.route() - equally excellent</td></tr>
    <tr><td><strong>CI speed</strong></td><td>Slower (single-threaded by default)</td><td>Faster (parallel workers by default)</td></tr>
    <tr><td><strong>Learning curve</strong></td><td>Gentle - great docs, great UI</td><td>Steeper - more concepts upfront</td></tr>
    <tr><td><strong>Community</strong></td><td>Larger, more Stack Overflow answers</td><td>Growing fast, Microsoft-backed</td></tr>
    <tr><td><strong>Best for</strong></td><td>Web apps, teams new to automation</td><td>Complex apps, cross-browser, enterprise scale</td></tr>
  </tbody>
</table>

<h2>So which one?</h2>

<p>Honestly? A lot of teams run both.</p>

<ul>
  <li><strong>Cypress</strong> when the team is JavaScript-first and you want that polished local debugging experience for your core web flows.</li>
  <li><strong>Playwright</strong> when you need Safari coverage, multi-tab or multi-user scenarios, or parallel runs without paying for infrastructure.</li>
  <li>Starting fresh and Safari is a requirement? Playwright is the shorter road. Onboarding people who've never automated anything? Cypress's runner is kinder.</li>
</ul>

<h2>The actual takeaway</h2>

<p>These two tools solve overlapping problems, not identical ones.</p>

<p>And in an interview, the useful thing isn't picking a side.</p>

<p>It's being able to say <strong>why</strong> you'd choose one for a specific product, and what you'd give up by doing it.</p>

<p>That answer is worth more than knowing every API in either. 😂</p>
    `
  },
  {
    id: 11,
    title: "AI in Software Testing: What's Already Here, What's Coming, and How to Stay Ahead",
    excerpt: "What AI tools are already doing in QA, workflows you can use today, and skills that still require a human tester.",
    date: "May 20, 2025",
    readTime: "11 min read",
    category: "AI",
    imageUrl: "/AIBasedTesting.jpeg",
    content: `
<p>Let's skip the part where we ask whether AI is going to change QA.</p>

<p>It already did. Quietly. While everybody was arguing about it on LinkedIn. 😂</p>

<p>So the more useful question is: where does it genuinely save time today, and where does it still need a human standing over it?</p>

<p>Everything here is stuff that works now. No predictions.</p>

<h2>What AI is already doing in testing</h2>

<h3>1. Generating tests</h3>

<p>The most immediate one. Copilot, Cursor and Claude will happily turn a description or an existing component into test cases, fixtures and page objects:</p>

<pre><code class="language-ts">
// Prompt: "Write Cypress tests for a login form with email, 
// password, submit button, and error handling"

// AI generates:
describe('Login Form', () => {
  beforeEach(() => cy.visit('/login'));

  it('successfully logs in with valid credentials', () => {
    cy.get('[data-cy=email]').type('user@example.com');
    cy.get('[data-cy=password]').type('ValidPass123');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });

  it('shows validation error for empty fields', () => {
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error]').should('contain', 'required');
  });

  it('shows error for invalid credentials', () => {
    cy.get('[data-cy=email]').type('wrong@example.com');
    cy.get('[data-cy=password]').type('wrongpass');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error]').should('be.visible');
  });
});
</code></pre>

<p>Useful. Genuinely.</p>

<p>But notice what it did there. It generated the obvious cases. The ones you'd have thought of anyway.</p>

<p>AI is good at <strong>scaffolding.</strong> You still decide what's worth testing and whether those cases map to actual user risk.</p>

<h3>2. Self-healing tests</h3>

<p>Every automation engineer knows this pain.</p>

<p>A developer renames a class. Thirty tests go red. Nothing is broken. Your selectors are just stale.</p>

<p>Tools like Testim, Mabl and Healenium try to recover by matching on context and surrounding attributes instead of one brittle string.</p>

<p>It cuts real maintenance time after a UI refactor. Just go and look at what it healed, because "the test passes now" and "the test still tests the right thing" are not the same sentence.</p>

<h3>3. Visual testing that isn't useless</h3>

<p>Old screenshot diffing fails on everything. Font rendering. Anti-aliasing. A one pixel shift because the CI machine felt different that day. 😂</p>

<p>AI-powered visual testing like Applitools and Percy compares at a semantic level instead. Layout, spacing, content. It can tell the difference between a real regression and noise.</p>

<pre><code class="language-js">
// Applitools integration with Cypress
import '@applitools/eyes-cypress/commands';

describe('Visual regression', () => {
  it('dashboard looks correct', () => {
    cy.visit('/dashboard');
    cy.eyesOpen({ appName: 'MyApp', testName: 'Dashboard' });
    cy.eyesCheckWindow('Dashboard Main View');
    cy.eyesClose();
  });
});
</code></pre>

<h3>4. Failure triage</h3>

<p>Your pipeline goes red with 47 failures.</p>

<p>You now have a choice: read 200 lines of stack trace, or get told "3 tests are failing because /api/checkout is timing out."</p>

<p>Tools like Sentry, Datadog and BuildPulse cluster failures, spot flaky tests and surface the likely root cause. This is one of those things that sounds small and then saves you an afternoon every week.</p>

<h3>5. Coverage analysis</h3>

<p>Not the coverage percentage. That number has been lying to us for years. 😂</p>

<p>AI tools can map your codebase against your suite and point at untested paths and high-risk areas, which is a much more honest answer than "we're at 82%."</p>

<h2>Workflows you can use this week</h2>

<h3>Turn a user story into test cases</h3>

<pre><code class="language-markdown">
Prompt to Claude/ChatGPT:
"Given this user story: 'As a user, I want to reset my password via email 
so that I can regain access to my account if I forget my password.'
Generate a comprehensive list of test cases covering happy path, 
edge cases, and error states. Format as Gherkin scenarios."

AI output:
Scenario: Successful password reset
  Given I am on the login page
  When I click "Forgot Password"
  And I enter my registered email address
  Then I should receive a password reset email
  And the email should contain a valid reset link

Scenario: Reset link expires after 24 hours
  Given I received a password reset email
  When I click the reset link after 24 hours
  Then I should see "This link has expired"
  And I should be prompted to request a new link

Scenario: Invalid email address format
  Given I am on the forgot password page
  When I enter "notanemail"
  Then I should see an inline validation error
  And the submit button should remain disabled
</code></pre>

<h3>Debug a failing test</h3>

<p>Paste the error and the test code and ask why it's failing.</p>

<p>I was sceptical about this one. I'm not anymore. For test automation specifically, modern AI is very good at spotting the thing you've been staring past for twenty minutes.</p>

<h3>Generate page objects from HTML</h3>

<p>Paste in a component's markup, ask for a page object.</p>

<p>Twenty minutes becomes two.</p>

<h3>Generate test data</h3>

<pre><code class="language-js">
// Prompt: "Generate realistic fixture data for 10 users with 
// name, email, role (admin/user), and createdAt date"

// AI generates your fixtures/users.json:
[
  { "id": 1, "name": "Sarah Chen",    "email": "s.chen@example.com",   "role": "admin", "createdAt": "2024-01-15" },
  { "id": 2, "name": "James Okonkwo", "email": "j.okonkwo@example.com", "role": "user",  "createdAt": "2024-02-03" },
  ...
]
</code></pre>

<p>Nobody has ever enjoyed writing fixture data by hand. Nobody. 😂</p>

<h2>What's coming</h2>

<p><strong>Tests generated from real sessions.</strong> Agents that watch actual user journeys, with consent, spot the untested ones and write tests for them.</p>

<p><strong>AI test architects.</strong> Not just writing tests, but deciding what belongs at unit level versus integration versus end to end, based on complexity, change frequency and business risk.</p>

<p><strong>Conversational test creation.</strong> "Make sure a free plan user hitting a premium feature sees the upgrade prompt." The agent writes it, runs it, reports back.</p>

<p><strong>Predictive failure detection.</strong> AI reads a pull request and predicts which tests will break before you run anything.</p>

<h2>So how do you stay useful?</h2>

<h3>1. Get better at asking</h3>

<p>Clear prompts with acceptance criteria, edge cases and framework context produce dramatically better output.</p>

<p>Treat AI like a fast junior. Brilliant, quick, and absolutely not merging anything without review.</p>

<h3>2. Actually try the tools</h3>

<p>Pick one and get hands-on:</p>

<ul>
  <li><strong>Applitools</strong> for AI visual testing, free tier available</li>
  <li><strong>Mabl</strong> for end to end with self-healing</li>
  <li><strong>Testim</strong> for ML-based authoring and maintenance</li>
  <li><strong>Healenium</strong> if you're on Selenium or Playwright and want open source</li>
  <li><strong>GitHub Copilot</strong> for writing tests in your editor</li>
</ul>

<h3>3. Double down on what it can't do</h3>

<p>AI is excellent at execution. It's weak at:</p>

<ul>
  <li><strong>Test strategy.</strong> Deciding what actually matters and why.</li>
  <li><strong>Domain knowledge.</strong> Understanding the business behind the feature.</li>
  <li><strong>Exploratory testing.</strong> The creative, slightly feral instinct that finds the bug nobody specified.</li>
  <li><strong>Stakeholder communication.</strong> Turning findings into something a business person can act on.</li>
  <li><strong>Risk assessment.</strong> Knowing which untested scenario would actually hurt a user.</li>
</ul>

<p>That list is your moat. Invest in it.</p>

<h3>4. Augmented, not dependent</h3>

<p>This risk is subtle.</p>

<p>If you always accept the output, you slowly stop understanding <em>why</em> a test is written the way it is. And then it breaks in some horrible edge case and you can't debug your own suite.</p>

<blockquote><p>Use AI to go faster. Keep enough understanding to go deeper.</p></blockquote>

<h3>5. Write down what works</h3>

<p>Shared prompt templates and review checklists beat everyone quietly experimenting alone.</p>

<p>If your team is using AI to write tests, agree on what a human checks before it merges.</p>

<h2>Where this leaves us</h2>

<p>AI is quick at the repetitive parts. Cases, fixtures, first-pass debugging.</p>

<p>Strategy, domain knowledge and exploratory testing are still ours.</p>

<p>And if you're already experimenting, keep notes on what saved you time and what you had to fix.</p>

<p>That feedback loop is worth more than adopting every tool the week it launches. 😂</p>
    `
  },
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Component architecture, performance, state management, and tooling choices for shipping maintainable web apps.",
    date: "April 14, 2024",
    readTime: "5 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Let's be honest.</p>

<p>Most of us didn't learn to build web apps properly. We learned to build them <strong>eventually.</strong> 😂</p>

<p>You start with one file. Then two. Then a folder called "components" that is really just where you put the things you'd rather not look at.</p>

<p>Six months later you're scared to rename a button.</p>

<p>So here are the patterns I actually reach for. Not because they're trendy, but because they keep a codebase easy to change later.</p>

<h2>The component mindset</h2>

<p>React, Vue and Svelte are all pushing the same idea.</p>

<p>Isolate your UI into components that own their markup, their styling and their local state.</p>

<p>A button stops being markup you copied across five pages. It becomes one thing, with variants, sizes and loading states.</p>

<pre><code class="language-jsx">
// ✅ Think like this
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => (
  &lt;button className={cn(baseStyles, variants[variant], sizes[size])} {...props}&gt;
    {children}
  &lt;/button&gt;
);
</code></pre>

<p>Write it once. Fix it once.</p>

<h2>Performance</h2>

<p>Slow apps lose people. That's the entire argument.</p>

<p>A few levers that consistently matter:</p>

<ul>
  <li><strong>Code splitting.</strong> Only ship the JavaScript the current page actually needs. React's <code>lazy()</code> and <code>Suspense</code> make this straightforward.</li>
  <li><strong>Image optimization.</strong> Modern formats like WebP and AVIF, lazy load anything below the fold, and always specify dimensions so the layout doesn't jump.</li>
  <li><strong>Caching.</strong> Proper cache headers, and service workers if you need offline.</li>
  <li><strong>Bundle analysis.</strong> Run <code>npx vite-bundle-visualizer</code> now and then.</li>
</ul>

<p>That last one is genuinely humbling. Run it on a project you're proud of and see what's actually in there. 😂</p>

<h2>State management</h2>

<p>Not every app needs Redux.</p>

<p>Actually, most don't.</p>

<p>Start with <code>useState</code> and <code>useContext</code>. Reach for Zustand or Jotai when things get complicated. Only bring in Redux or TanStack Query when you genuinely need server state synchronised at scale.</p>

<p>The rule of thumb:</p>

<blockquote><p>If your state lives in one component, keep it there. If two siblings need it, lift it up. If the whole app needs it, use context or a store.</p></blockquote>

<p>That's it. That's the whole decision tree.</p>

<h2>Tooling</h2>

<p>The stack I default to on new frontend work:</p>

<ul>
  <li><strong>Vite</strong> over Create React App. Faster cold starts, instant HMR, better developer experience.</li>
  <li><strong>TypeScript</strong> from day one. Your future self will thank you.</li>
  <li><strong>ESLint and Prettier.</strong> Automate the style debates so you can argue about real things instead.</li>
  <li><strong>Vitest</strong> for unit tests. It shares Vite's config and it's significantly faster than Jest.</li>
</ul>

<h2>Deployment</h2>

<p>Vercel, Netlify and Cloudflare Pages have made shipping almost too easy.</p>

<p>Almost. Convenience is not a reason to skip preview environments, basic error monitoring and a rollback plan.</p>

<p>Because the day you need a rollback plan is not the day you want to start writing one. 😂</p>

<h2>So what actually matters?</h2>

<p>Reusable components.</p>

<p>Performance you actually measured.</p>

<p>A lean stack until the project genuinely asks for more.</p>

<p>Start there. Add complexity when the work demands it, not when your timeline does. 😂</p>
    `
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    excerpt: "Where AI coding assistants help today, where they fall short, and what that means for how you work.",
    date: "April 10, 2024",
    readTime: "7 min read",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Copilot, Cursor and chat assistants are just part of the job now.</p>

<p>Most of us have stopped thinking about it. You open the editor, something autocompletes, you hit tab, you move on.</p>

<p>Which is fine. Until it isn't.</p>

<p>Because these tools are genuinely brilliant at some things and quietly terrible at others, and knowing which is which is most of the skill.</p>

<h2>What AI is actually good at right now</h2>

<p>Boilerplate. Scaffolding components. Writing tests for small functions. Explaining code you've never seen before. Completing patterns it has seen ten thousand times.</p>

<p>All of that, it does well.</p>

<h2>And what it isn't</h2>

<p>Novel architecture. Nuanced business rules. Anything that depends on context living in someone's head rather than in the repo.</p>

<p>Ask it why your team made a weird decision in 2022 and it will confidently invent a reason. 😂</p>

<p>So think of it as a fast collaborator on well-defined work. Not a substitute for understanding what you're shipping.</p>

<h2>Tools worth trying</h2>

<ul>
  <li><strong>GitHub Copilot.</strong> The most mature option. Deep editor integration and decent multi-file context.</li>
  <li><strong>Cursor.</strong> A full IDE built on VS Code. The multi-file editing is genuinely impressive for refactoring.</li>
  <li><strong>Claude and ChatGPT.</strong> Better for architecture discussions, debugging sessions and anything that benefits from back and forth.</li>
  <li><strong>Codeium.</strong> Free, and worth a look if budget is the deciding factor.</li>
</ul>

<h2>What this does to testing</h2>

<p>AI can draft test cases from user stories and point at coverage gaps. On the QA side, tools like Testim and Mabl add self-healing selectors.</p>

<p>But generated tests still need a human to read them.</p>

<p>Because here's the thing nobody says out loud:</p>

<blockquote><p>A passing test that asserts the wrong thing is worse than no test at all.</p></blockquote>

<p>No test tells you nothing. A wrong test tells you something false, and you believe it.</p>

<h2>What it means for your career</h2>

<p>Developers who use AI well spend less time on syntax and more on design, review and explaining things to other humans.</p>

<p>Which means those skills get <strong>more</strong> valuable, not less.</p>

<p>When generating code becomes cheap, knowing what's worth generating becomes the job.</p>

<h2>The risk nobody likes talking about</h2>

<p>Over-reliance shows up as subtle bugs in code that looks completely fine at a glance.</p>

<p>And if you're early in your career, skipping the debugging practice costs you something you won't notice for years. The mental models that make senior work possible are built by struggling through problems, not by watching something else solve them.</p>

<p>Use AI to move faster.</p>

<p>Not to skip understanding.</p>

<h2>Where this lands</h2>

<p>AI in development is an amplification layer. It is not a replacement story, whatever LinkedIn is telling you this week. 😂</p>

<p>Learn where it helps your workflow. Review everything it produces.</p>

<p>That's the whole strategy.</p>
    `
  },
  {
    id: 3,
    title: "Creating Responsive UIs with Tailwind CSS",
    excerpt: "Utility-first styling, responsive layouts, design tokens, and dark mode with Tailwind CSS.",
    date: "April 5, 2024",
    readTime: "6 min read",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Everyone hates Tailwind for about a week.</p>

<p>You look at a div with fourteen classes on it and think, genuinely, "we spent twenty years separating content from presentation and this is what we did with it." 😂</p>

<p>Then you build a project with it.</p>

<p>Then you go back to a normal CSS file and realise you have no idea which of these 400 lines are still being used.</p>

<h2>Utility-first styling</h2>

<p>Bootstrap hands you opinionated components. You then spend your time fighting them.</p>

<p>Tailwind hands you primitives instead. <code>flex</code>, <code>pt-4</code>, <code>text-gray-700</code>. You compose them into whatever you actually need.</p>

<p>The trade is simple. You give up separate CSS files. You get styling decisions that live next to the thing they style.</p>

<h2>Responsive layouts</h2>

<p>This is where it clicked for me.</p>

<p>Tailwind is mobile-first. You write the base style for small screens, then override at larger ones:</p>

<pre><code class="language-html">
&lt;div class="
  flex flex-col          /* mobile: stack vertically */
  md:flex-row            /* tablet+: side by side */
  gap-4
  p-4 md:p-8            /* more padding on larger screens */
"&gt;
  ...
&lt;/div&gt;
</code></pre>

<p>Base styles hit mobile. Prefixes like <code>md:</code> and <code>lg:</code> take over at wider screens.</p>

<p>The responsive rules sit right next to the element they affect. No jumping to another file to find out why something collapses at 768px.</p>

<h2>Design tokens</h2>

<p>The config file is what keeps a team honest.</p>

<p>Define your colours and fonts once and reuse them everywhere:</p>

<pre><code class="language-js">
// tailwind.config.js - your design tokens live here
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
</code></pre>

<p>Now nobody is inventing a seventh shade of blue at 4pm on a Friday. 😂</p>

<h2>Dark mode</h2>

<p>Add <code>darkMode: 'class'</code>, then prefix with <code>dark:</code>.</p>

<pre><code class="language-html">
&lt;div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-fg"&gt;
  Reads perfectly in both modes.
&lt;/div&gt;
</code></pre>

<p>No separate stylesheet. No duplicate theme file. That's it.</p>

<h2>Extracting patterns with @apply</h2>

<p>When the same combination keeps repeating, you can pull it out:</p>

<pre><code class="language-css">
.btn-primary {
  @apply px-4 py-2 rounded-lg bg-accent-500 text-fg font-medium
         hover:bg-accent-400 transition-colors duration-200;
}
</code></pre>

<p>But go easy on this.</p>

<p>The whole point of Tailwind is that styles stay local. If you <code>@apply</code> everything, you've just rebuilt a CSS file with extra steps and a build tool. 😂</p>

<p>Save it for the handful of patterns you genuinely use everywhere.</p>

<h2>Is it worth it?</h2>

<p>Tailwind asks you to think about CSS differently. Utilities in the markup, tokens in the config, responsive rules where you can see them.</p>

<p>Give it two projects before you decide.</p>

<p>One is not enough. You'll still be annoyed. 😂</p>
    `
  },
  {
    id: 4,
    title: "TypeScript: Why You Should Use It",
    excerpt: "How TypeScript catches bugs early, improves editor support, and fits into existing JavaScript projects.",
    date: "March 28, 2024",
    readTime: "4 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Every JavaScript developer has met this error:</p>

<blockquote><p><code>Cannot read properties of undefined (reading 'map')</code></p></blockquote>

<p>In production. On a Friday. 😂</p>

<p>And when you finally trace it, it's the same story every time. Somebody passed a string where an array was expected, and nothing anywhere told them not to.</p>

<p>TypeScript would have caught that while you were still typing it.</p>

<h2>Types are documentation that can't lie</h2>

<p>The best documentation is the kind that stays true without anyone maintaining it.</p>

<p>When you type a function, the signature <em>is</em> the documentation:</p>

<pre><code class="language-ts">
// Anyone calling this knows exactly what goes in and what comes out
async function fetchUserById(id: string): Promise&lt;User | null&gt; {
  // ...
}
</code></pre>

<p>Now compare that to a JSDoc comment someone wrote 18 months ago, which may or may not describe what the function does today.</p>

<p>Types enforce the contract.</p>

<p>Comments just suggest it. 😂</p>

<h2>Your editor gets significantly smarter</h2>

<p>Autocomplete on object properties. Errors on wrong arguments before you run anything. Renames that work across the whole project. Jump-to-definition that actually lands where it should.</p>

<p>This is the part people underestimate. It's not just safety. It's that the editor finally knows what you're talking about.</p>

<h2>Interfaces and generics</h2>

<p>Once you're past the basics, you can model your actual domain:</p>

<pre><code class="language-ts">
interface ApiResponse&lt;T&gt; {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: number;
}

// Reuse it for anything
const userResponse: ApiResponse&lt;User&gt; = await api.getUser(id);
const postsResponse: ApiResponse&lt;Post[]&gt; = await api.getPosts();
</code></pre>

<p>You write the shape once. TypeScript enforces it everywhere.</p>

<p>Change the interface and every place that breaks lights up immediately, instead of six weeks later in someone's browser.</p>

<h2>The first week is annoying</h2>

<p>I won't pretend otherwise.</p>

<p>Week one feels slower. You're arguing with the compiler about things you already know are fine.</p>

<p>Then a few weeks pass, you open an untyped JavaScript file, and it feels like driving without a seatbelt.</p>

<p>You don't need <code>strict</code> mode on day one either. Turn it on gradually as the team gets comfortable.</p>

<h2>The ecosystem already decided</h2>

<p>Most major libraries ship types now. Most new projects start with TypeScript by default. Job listings put it right next to JavaScript itself.</p>

<p>The debate is largely over. 😂</p>

<h2>So is it worth it?</h2>

<p>You trade a bit of upfront typing for fewer runtime surprises and much better tooling.</p>

<p>For anything bigger than a small script, that's a good trade.</p>
    `
  },
  {
    id: 5,
    title: "Building a Portfolio That Stands Out",
    excerpt: "How to structure a developer portfolio so hiring managers understand your work quickly.",
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Most developer portfolios are just a CV wearing CSS. 😂</p>

<p>Skills list. Project grid. Contact form nobody fills in.</p>

<p>And here's the uncomfortable part. A hiring manager gives yours somewhere under a minute on the first pass.</p>

<p>So the question isn't "does my portfolio look nice."</p>

<p>It's <strong>can someone tell what I do and why it matters, fast.</strong></p>

<h2>Lead with what you actually do</h2>

<p>Generic hero copy tells them nothing:</p>

<pre><code class="language-markdown">
❌ "Passionate developer who loves building things"
✅ "I build fast, accessible React applications with a focus on QA and test coverage"
</code></pre>

<p>One of those describes literally every developer alive. The other tells someone whether to keep reading.</p>

<h2>Fewer projects. Better ones.</h2>

<p>Three excellent projects beat ten average ones. Every single time.</p>

<p>Nobody is browsing your gallery. They'll look at one or two things, and those things have to land.</p>

<p>So pick projects that:</p>

<ul>
  <li>Solve a real problem you actually cared about</li>
  <li>Show depth rather than breadth</li>
  <li>Have a live demo, because a dead link ends the conversation instantly</li>
  <li>Show your decisions, not just the finished thing</li>
</ul>

<p>That last one matters more than most people realise.</p>

<p>Write a short case study for each. What was the problem? What did you consider? What did you trade away, and why?</p>

<p>That's the difference between a portfolio and a list of GitHub links.</p>

<h2>Write about how you think</h2>

<p>A short blog or a case study per project shows your reasoning, not just your output.</p>

<p>And you don't need a weekly publishing schedule. Nobody is checking. A handful of honest technical posts does the job.</p>

<h2>Your portfolio is itself a work sample</h2>

<p>This one catches people out.</p>

<p>If you're claiming frontend skills on a site that takes six seconds to load, you've made the argument against yourself before anyone read a word. 😂</p>

<p>Run Lighthouse. Fix the obvious things. Treat load time as part of the submission.</p>

<h2>Design, without going overboard</h2>

<p>You don't need custom illustrations.</p>

<p>Pick one accent colour. Use a consistent type scale. Leave whitespace. Borrow layout ideas from sites you already like.</p>

<p>Dark themes tend to work well for developer portfolios because code and UI both read cleanly on them.</p>

<h2>Make it easy to contact you</h2>

<p>Email, LinkedIn and GitHub, visible without hunting.</p>

<p>Every extra click between "interested" and "message sent" costs you people.</p>

<h2>The short version</h2>

<p>A good portfolio answers three things. What you build. How you think. How to reach you.</p>

<p>And then ship it.</p>

<p>An imperfect site that's live beats a perfect one that never leaves localhost. 😂</p>
    `
  },
  {
    id: 6,
    title: "The Rise of Web Components",
    excerpt: "Custom elements, Shadow DOM, and where Web Components fit alongside React or Vue.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Frameworks come and go.</p>

<p>Meanwhile the browser quietly shipped its own way to build reusable components, and a lot of us never looked at it.</p>

<p>To be clear, Web Components are not here to replace React. They sit at a different layer of the stack entirely, and that's the part worth understanding.</p>

<h2>So what are they?</h2>

<p>It's an umbrella term for three browser APIs that work together:</p>

<ul>
  <li><strong>Custom Elements.</strong> Define your own HTML tags. <code>&lt;my-button&gt;</code> becomes a real element the browser understands.</li>
  <li><strong>Shadow DOM.</strong> Real encapsulation. Styles inside don't leak out, styles outside don't bleed in. No specificity wars.</li>
  <li><strong>HTML Templates.</strong> Inert markup in a <code>&lt;template&gt;</code> that gets cloned into the DOM when you need it.</li>
</ul>

<p>That Shadow DOM point deserves a moment. Actual style encapsulation, from the platform, with no build step and no naming convention you have to remember. 😂</p>

<pre><code class="language-js">
class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      &lt;style&gt;button { background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }&lt;/style&gt;
      &lt;button&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/button&gt;
    \`;
  }
}

customElements.define('my-button', MyButton);
// Now usable as &lt;my-button&gt;Click me&lt;/my-button&gt; anywhere
</code></pre>

<h2>They work everywhere</h2>

<p>A custom element runs in React, Vue, Angular or a plain HTML file.</p>

<p>Which is exactly why the big organisations use them. Google has Lit, Microsoft has Fluent, Adobe has Spectrum. When you have thirty teams on six different stacks, a design system that only works in one framework isn't a design system.</p>

<h2>So should you drop React?</h2>

<p>No. 😂</p>

<p>Web Components are great for leaf UI. Buttons, inputs, badges, the small things everybody shares.</p>

<p>They get verbose fast for complex application logic, and the ecosystem around them is nowhere near a full framework's.</p>

<p>The practical split most teams land on:</p>

<blockquote><p>Web Components for shared primitives and design tokens. React or Vue for application state and routing.</p></blockquote>

<h2>Lit makes them bearable</h2>

<p>The raw APIs are a lot of ceremony. Lit adds reactive properties and declarative templates on top, and still outputs standard custom elements:</p>

<pre><code class="language-js">
import { LitElement, html, css } from 'lit';

class MyCard extends LitElement {
  static properties = { title: { type: String } };
  static styles = css\`div { border: 1px solid #eee; padding: 16px; border-radius: 8px; }\`;

  render() {
    return html\`&lt;div&gt;&lt;h2&gt;\${this.title}&lt;/h2&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;\`;
  }
}
customElements.define('my-card', MyCard);
</code></pre>

<p>Same output. Much less typing.</p>

<h2>Browser support</h2>

<p>Every major browser has supported this since around 2020.</p>

<p>So the thing holding it back isn't the platform. It's tooling and team familiarity, which is a much more boring problem. 😂</p>

<h2>Worth knowing?</h2>

<p>Yes, even if you spend all day inside a framework.</p>

<p>Web Components fill a specific niche: portable, encapsulated UI that belongs to the platform rather than to whatever we're all using this year.</p>
    `
  },
];

/**
 * One chip style for every category, shared by the blog index, a post header and
 * the homepage preview.
 *
 * It used to be a per-category colour map - purple for AI, amber for Career, and
 * so on - written at the 300 weight, which only ever had contrast against a dark
 * surface. In light mode those chips were pastel-on-white and close to
 * illegible, and five hues fought the one-accent rule the palette is built on.
 * Frosted neutral reads the same in both themes, and the category is still named
 * in the label, which is where the information actually lives.
 */
export const CATEGORY_CHIP = 'glass-pill text-fg-muted';

/* The chip on a card sits on top of the cover photo, where `glass-pill` borrows
   the page background and disappears over a light image. Anything laid over a
   photo needs its own contrast, so it carries a dark scrim and white text in
   both themes rather than following the theme tokens. */
export const CATEGORY_CHIP_ON_IMAGE =
  'border border-white/20 bg-black/40 text-white backdrop-blur-md';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Blog</h1>
            <p className="text-fg-muted max-w-lg mx-auto">
              Mostly what happens when I get bored and start poking at things.
              Testing, frontend, AI, and the occasional strong opinion. 😂
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="glass group cursor-pointer rounded-2xl overflow-hidden hover:border-brand-line"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${CATEGORY_CHIP_ON_IMAGE}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-fg-subtle mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2 text-brand-line">|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-fg group-hover:text-fg transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-fg-muted group-hover:translate-x-1 transition-transform">
                    Read more →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
