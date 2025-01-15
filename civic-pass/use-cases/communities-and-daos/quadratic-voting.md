# Quadratic Voting

### **Enhancing DAO Governance with Quadratic Voting**

Fair voting is essential for DAOs, especially for critical decisions and resource allocations. Quadratic voting allows voters to express the strength of their preferences using credits, offering a more nuanced representation of community sentiment. It helps prevent majority rule from silencing minority opinions and strengthens DAO governance. Civic offers passes and an implementation of quadratic voting on Solana, providing precise, trustworthy solutions across blockchain networks.

### **What is Quadratic Voting?**

Quadratic voting lets voters not only choose but also indicate the strength of their preferences. Each voter receives credits, which they can distribute among options. The number of votes each option gets is the square root of the credits allocated, making it costly to favor one option without genuine strong support. In Civic's implementation, voters allocate credits to a single preference with diminishing returns for each additional vote, ensuring balanced representation.

#### How Votes Are Weighted

By verifying and tokenizing aspects of members’ real-world identities, Civic allows for the possibility of assigning different weights to votes based on verified attributes:

* Adjusting coefficients (a, b, c) can change the sensitivity of voting power relative to token holdings. For instance, setting coefficients a and c to 0 and b to 1 would make the voting power directly proportional to the number of tokens held, while the default setting (a = 1, b = 0, c = 0) makes it proportional to the square root.
* Circulating token supply is a factor that sets the max voter weight as a fraction of the total circulating supply of governance tokens, ensuring that no single entity can dominate the voting process.&#x20;

### QV Best Practices

1. **Start with Default Coefficients**. Begin with the default coefficients (a = 1, b = 0, c = 0) to leverage the basic quadratic voting principle (the voting power is proportional to the square root of tokens held). You can then experiment with adjusting the coefficients to fine-tune the sensitivity of voting power. For example, increasing coefficient a while keeping b and c low can slightly amplify the influence of larger token holders if necessary.
2. **Set a Realistic Circulating Token Supply Factor.** Analyze your DAO’s token distribution and set the circulating supply factor to a realistic value that prevents any single entity from accumulating excessive voting power. Typically, a value less than 1 is recommended to ensure broader participation.
3. **Determine an Appropriate Approval Quorum.** Establish an approval quorum that reflects the engagement level of your community. A higher quorum can prevent rash decisions but may also make it harder to pass proposals. Balance it according to the activity and size of your DAO.
4. **Monitor and Adapt.** Civic helps create a more engaged and trustworthy voting environment. Regularly assess how your quadratic voting settings impact governance and be ready to adjust based on participation, power balance, and community feedback.

### Key Benefits

* **Ensure Enhanced Representation**: Quadratic voting gives all voices, especially minorities, a say. Civic ensures each vote is cast by a unique individual and reflects community sentiment.
* **Reduce Voter Apathy**: Quadratic voting lets voters express stronger preferences, making voting more meaningful and boosting participation.
* **Maintain Fair Decision-Making**: Quadratic voting balances influence, preventing domination by a few. Civic’s secure framework ensures fair DAO governance.

### Use Cases in DAOs

* **Enable Governance Decisions**: Members can express the strength of their preferences on DAO changes. Civic’s integration ties each vote to a verified identity, preventing fraud.
* **Streamline Resource Allocation**: Members show varying priorities for projects or resources. Civic ensures genuine, diverse community input in decisions.
* **Facilitate Officer or Committee Elections**: Candidates are supported based on preference strength. Civic ensures transparency and security, linking each vote to a unique identity.
* **Manage Controversial Proposals**: Captures support or opposition intensity, leading to fairer resolutions that consider minority views. Civic ensures accurate vote counting and reduces fraud.
* **Support Conflict Resolution**: Allows members to express the strength of their feelings during disputes, aiding mediation. Civic ensures authenticated votes for fair resolutions.

### How Civic Can Help

Civic’s identity verification tools boost the fairness and security of quadratic voting in DAOs:

* **Sybil Resistance:** The Civic Uniqueness Pass ensures each participant corresponds to a unique individual, preventing the manipulation of quadratic voting constraints by spreading votes across multiple accounts.
* **Enforcement of One-Person-One-Wallet-One-Vote:** The Civic Uniqueness Pass ensures each participant corresponds to a unique individual.
* **Location and Age Gating:** The Civic ID Verification Pass restricts voting based on age or geographic location, enforcing compliance.
* **ID Verification Compliance:** The ID Verification Pass provides thorough government-issued document checks, comparison of the document photo with the person’s face, ensuring participants are legitimate and meet DAO criteria.
* **Adding Weight to Votes:** Civic allows for assigning different weights to votes based on verified attributes, enhancing the representation in the voting process.

### Our Integration with Realms

Civic Pass is already integrated with [Realms](https://app.realms.today/realms), a DAO governance platform on Solana. This allows DAOs on Realms to quickly adopt Civic’s identity verification solutions, improving the security and fairness of their voting processes.

### Get In Touch

If you are interested in bringing Civic’s advanced tools to your DAO, please [get in touch](https://civickey.typeform.com/req-custom).
