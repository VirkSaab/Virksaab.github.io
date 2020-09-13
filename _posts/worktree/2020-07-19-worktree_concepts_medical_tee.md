---
layout: post
type: "WorkTree"
subject: "Concepts"
section: "Medical"
title:  "Treatment Effect Estimation (TEE)"
author: Jitender Singh Virk
---

<p style="background: #eeeeee;">
Note: The paragraph in little dark color background represents small terms or concepts used in the main concepts.</p>

To understand Treatment Effect Estimation (TEE), let's first look at some concepts used for TEE.

### Random Control Trial (RCT)
RCT is a way to test out a new drug or treatment for a particular disease. In this, we make two groups of people/participants - intervention and control. We give the new drug or treatment to each individual in intervention group and fake drug (placebo) or standard treatment to the control group. After that, we observe both groups closely for a specific period of time and note the effects. To conduct a RCT, make sure that both groups are unbiased and randomly well balanced. For example, if Age is a variable present in both group, then make sure that the mean age of both groups is similar or close. Similarly, try to balance all variables.

<p style="background: #eeeeee;">
<b>Absolute Risk (AR)</b> is the probability of developing a disease over a time period. For example, the chances of a person getting a heart attack or cancer in a year is 10%. We can say that a person has 0.1 AR of heart attack or cancer.
</p>

#### Absolute Risk Reduction (ARR)
ARR is used to measure the outcome of RCT. It is also known as *risk difference*. For example, suppose, we are testing a new heart attack treatment. We take total 200 participants for our one year trial. We make two groups - intervention and control. Each group contains 100 people. Now suppose, 2% in intervention group gets a heart attack and 5% in control group gets a heart attack. The AR for intervention group and control group is 0.02 and 0.05, respectively. Therefore, the ARR for giving our treatment is 0.05 - 0.02 = 0.03.


We use *p* value along with ARR to analyse the significance of our trail results. Therefore, with reporting the effects results, we also report *p* value.

<p style="background: #eeeeee;">
<b><em>p</em> value</b>: Lower the p value greater the significance. Higher individual in trial means better p value.
</p>


### Modeling Treatment Effect


<!-- SAMPLE CODE TO RENDER MATH IN GITHUB PAGE:

The probability of dying for patients who received the treatment is:

$$p_{\text{treatment, death}} = \frac{n_{\text{treatment,death}}}{n_{\text{treatment}}}$$

- $n_{\text{treatment,death}}$ is the number of patients who received the treatment and died.
- $n_{\text{treatment}}$ is the number of patients who received treatment.

The probability of dying for patients in the control group (who did not received treatment) is:

$$p_{\text{control, death}} = \frac{n_{\text{control,death}}}{n_{\text{control}}}$$
- $n_{\text{control,death}}$ is the number of patients in the control group (did not receive the treatment) who died.
- $n_{\text{control}}$ is the number of patients in the control group (did not receive treatment). -->




---
##### References:

* [AI for Medical Treatment course - Coursera](https://www.coursera.org/learn/ai-for-medical-treatment)
* https://www.ncbi.nlm.nih.gov/books/NBK63647/
