# Quadratic Voting in DAOs

## Enhancing Democratic Governance in DAOs

Fair and representative voting is a key pillar in the functioning of decentralized autonomous organizations (DAOs), especially for critical decisions and resource allocations. Quadratic voting is an innovative solution that empowers voters to convey the strength of their convictions through a credits-based system, ensuring a more nuanced representation of community sentiment. It combats majority rule and the marginalization of minority opinions, enhancing DAO governance and provides resistance against attacks such as [<mark style="color:purple;">flash loan exploits</mark>](https://www.researchgate.net/figure/Example-flash-loan-attack-against-Maker-DAO-All-steps-can-be-executed-within-one\_fig3\_339374442). Civic provides a suite of passes, as well as an example implementation of the quadratic voting mechanics on Solana, that can address these diverse governance needs with precision and integrity across various blockchain networks.

### How Quadratic Voting Works

Quadratic voting aims to revolutionize traditional voting by allowing voters to express not just a choice but also the strength of their preference. There are numerous[ <mark style="color:purple;">historical examples of quadratic voting implementation</mark>](https://en.m.wikipedia.org/wiki/Quadratic\_voting#Applications), but the most common system is that each voter is allocated a set number of credits, which they can distribute among options according to their preferences.&#x20;

The unique aspect of quadratic voting lies in the counting of votes: the number of votes each option receives is the square root of the total credits allocated to it. This system encourages balanced and fair decision-making by making it costly to heavily favor one option without genuine strong preference.

In the current Civic implementation of quadratic voting, the ability to distribute preference among multiple options is not available due to platform limitations on [<mark style="color:purple;">Realms</mark>](https://realms.today/), which allows multiple-choice votes but restricts voters to selecting only one option. Our solution addresses this by ensuring that each vote is still 100% committed to a single preference, but with diminishing returns for each subsequent vote. Specifically, if a voter has 100 votes, the first vote is worth 1, the second is worth slightly less, and so on, with the total influence calculated as the square root of the sum of the credits used. This method ensures a balanced representation of voter intensity

### How Weights Are Added to Votes on Realms

By verifying and tokenizing aspects of members’ real-world identities, Civic allows for the possibility of assigning different weights to votes based on verified attributes. Quadratic Voting factors available on Realms:

* Adjusting coefficients (a, b, c) can change the sensitivity of voting power relative to token holdings. For instance, setting coefficients a and c to 0 and b to 1 would make the voting power directly proportional to the number of tokens held, while the default setting (a = 1, b = 0, c = 0) makes it proportional to the square root.
* Circulating token supply is a factor that sets the max voter weight as a fraction of the total circulating supply of governance tokens, ensuring that no single entity can dominate the voting process. This approach adapts to current Realms limitations by manually setting the approval quorum as a percentage of the circulating voter weight, ensuring proposals require sufficient community support to pass without needing every member to vote.

### Best Practices for Quadratic Voting

1. Start with Default Coefficients

Begin with the default coefficients (a = 1, b = 0, c = 0) to leverage the basic quadratic voting principle (the voting power is proportional to the square root of tokens held). You can then experiment with adjusting the coefficients to fine-tune the sensitivity of voting power. For example, increasing coefficient a while keeping b and c low can slightly amplify the influence of larger token holders if necessary.

2. Set a Realistic Circulating Token Supply Factor

Analyze your DAO’s token distribution and set the circulating supply factor to a realistic value that prevents any single entity from accumulating excessive voting power. Typically, a value less than 1 is recommended to ensure broader participation.

3. Determine an Appropriate Approval Quorum

Establish an approval quorum that reflects the engagement level of your community. A higher quorum can prevent rash decisions but may also make it harder to pass proposals. Balance it according to the activity and size of your DAO.

4. Monitor and Adapt

Civic’s identity verification helps you to foster a more engaged and trustworthy voting environment. However, you should regularly review the impact of your quadratic voting settings on governance outcomes. Be prepared to make adjustments based on participation rates, the balance of power, and feedback from community members.

### Key Benefits of Quadratic Voting

• Enhanced Representation: Quadratic voting ensures all voices, especially minorities, are considered. Civic’s technology ensures that each vote is genuinely cast by a unique individual and accurately reflects community sentiments.

• Reduction of Voter Apathy: Quadratic voting engages a broader segment of the community by allowing voters to express varying degrees of preference. The solution Civic proposes makes voting more meaningful, boosting participation rates.

• Fairness in Decision-Making: Quadratic voting balances the influence among participants, preventing dominance by heavily invested parties. Civic’s secure framework ensures the integrity of the electoral process, maintaining fairness in DAO governance.

### Quadratic Voting Use Cases in DAOs

&#x20; 1\. Governance Decisions: Enables members to express the intensity of their preferences on foundational changes within the DAO. Civic’s integration ensures that each vote is securely tied to a [<mark style="color:purple;">verified identity</mark>](https://docs.civic.com/), preventing fraudulent votes.

&#x20; 2\. Resource Allocation: Allows members to show varying levels of priority for different projects or resource distribution plans. This technology ensures that allocations are decided by genuine and diverse community input.

&#x20; 3\. Election of Officers or Committee Members: Supports candidates based on the strength of preference. Civic ensures this process is transparent and secure, with each vote linked to a unique digital identity.

&#x20; 4\. Handling Controversial Proposals: Captures the intensity of support or opposition, leading to more satisfactory resolutions that consider minority views. Civic’s framework ensures accurate vote counting and reduces voting fraud.

&#x20; 5\. Conflict Resolution: Helps in expressing the intensity of feelings about various solutions during disputes, aiding in mediation processes. Civic’s integration ensures authenticated votes, promoting fair resolutions.

### How Civic Can Help with the Quadratic Voting Process

Civic’s suite of identity verification solutions enhances the fairness and security of quadratic voting systems within DAOs.

* **Sybil Resistance:** The Civic Uniqueness Pass ensures each participant corresponds to a unique individual, preventing the manipulation of quadratic voting constraints by spreading votes across multiple accounts.
* **Enforcement of One-Person-One-Wallet-One-Vote:** The Civic Uniqueness Pass ensures each participant corresponds to a unique individual.
* **Location and Age Gating:** The Civic ID Verification Pass restricts voting based on age or geographic location, enforcing compliance.
* **ID Verification Compliance:** The ID Verification Pass provides thorough government-issued document checks, comparison of the document photo with the person’s face, ensuring participants are legitimate and meet DAO criteria.
* **Adding Weight to Votes:** Civic allows for assigning different weights to votes based on verified attributes, enhancing the representation in the voting process.

### Civic Integration with Realms

Civic Pass is already integrated with Realms, a popular DAO governance platform on Solana. This integration allows DAOs on Realms to quickly implement Civic’s identity verification solutions to enhance the security and fairness of their voting processes. For more information, refer to the[ <mark style="color:purple;">Realms Integration Documentation</mark>](https://docs.civic.com/third-party-integrations/realms)<mark style="color:purple;">.</mark>

### Get Quadratic Voting for Your DAO

Civic passes can also be integrated into other DAO platforms to provide robust identity verification and secure voting processes. Together, we can enhance the integrity and trust of decentralized governance. If you are interested in bringing Civic’s advanced tools to your platform, please [<mark style="color:purple;">get in touch</mark>](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a).
