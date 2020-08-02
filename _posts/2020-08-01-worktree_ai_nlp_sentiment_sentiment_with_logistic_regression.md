---
layout: post
type: "WorkTree"
area: "AI"
subject: "Natural Language Processing (NLP)"
section: "Sentiment Analysis"
title:  "Tweet Sentiment Analysis with Logistic Regression - 1"
author: Jitender Singh Virk
---

<sup>last updated: {{ page.date | date: "%d %b, %Y" }} || Author: {{ page.author }}</sup>

---

[Click here](https://nbviewer.jupyter.org/gist/VirkSaab/f5de2b5f83df4b7a82d7bc2a81f3874e) to view in nbviewer.

Download this notebook from [here](https://gist.github.com/VirkSaab/f5de2b5f83df4b7a82d7bc2a81f3874e)

---

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><strong>Sentiment Analysis</strong>: Given a sentence, analysing whether the sentence is sad, happy, angry, etc. For example, <em>Woho! I got selected in Harvard university!</em> reflects happy sentiment. <em>I lost my phone in subway</em> reflects sad sentiment. Usually, we use tweets data for sentiment analysis but, ofcourse, you can use any type of data.</p>
<p>We cannot use raw words as inputs to any machine learning model because data must be numerical. To convert text data into numerical we use <em>vocabulary</em>.</p>
<p><strong>Vocabulary</strong>: It is a set of unique words that appear in the data. Usually, we build this vocab from training data but we can use predefined vocabulary as well. For this project, we'll build it from scratch. Vocabulary is required to create features from words and sentences to train a model. For example, <em>I lost my phone in subway. I am stupid.</em> will create a vocabulary that contains I, lost, my, phone, in, subway, am, stupid. Now, there are several ways to create features from these words.</p>
<p>There are several ways to convert text to numerical features. We will discuss them below.</p>
<p>Watch <a href="https://www.coursera.org/learn/classification-vector-spaces-in-nlp/lecture/gNXI3/vocabulary-feature-extraction">this video</a> for more details on vocabulary and feature extraction.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>To start let's use a simple tweets dataset from NLTK library</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">re</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">nltk.corpus</span> <span class="kn">import</span> <span class="n">twitter_samples</span>
<span class="kn">from</span> <span class="nn">collections</span> <span class="kn">import</span> <span class="n">Counter</span>
<span class="c1"># uncomment below line to download the dataset</span>
<span class="c1"># nltk.download(&#39;twitter_samples&#39;) </span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># select the set of positive and negative tweets</span>
<span class="n">positive_tweets</span> <span class="o">=</span> <span class="n">twitter_samples</span><span class="o">.</span><span class="n">strings</span><span class="p">(</span><span class="s1">&#39;positive_tweets.json&#39;</span><span class="p">)</span>
<span class="n">negative_tweets</span> <span class="o">=</span> <span class="n">twitter_samples</span><span class="o">.</span><span class="n">strings</span><span class="p">(</span><span class="s1">&#39;negative_tweets.json&#39;</span><span class="p">)</span>

<span class="nb">print</span><span class="p">(</span><span class="s1">&#39;Number of positive tweets: &#39;</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">positive_tweets</span><span class="p">))</span>
<span class="nb">print</span><span class="p">(</span><span class="s1">&#39;Number of negative tweets: &#39;</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">negative_tweets</span><span class="p">))</span>

<span class="nb">print</span><span class="p">(</span><span class="s1">&#39;</span><span class="se">\n</span><span class="s1">The type of all_positive_tweets is: &#39;</span><span class="p">,</span> <span class="nb">type</span><span class="p">(</span><span class="n">positive_tweets</span><span class="p">))</span>
<span class="nb">print</span><span class="p">(</span><span class="s1">&#39;The type of a tweet entry is: &#39;</span><span class="p">,</span> <span class="nb">type</span><span class="p">(</span><span class="n">negative_tweets</span><span class="p">[</span><span class="mi">0</span><span class="p">]))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Number of positive tweets:  5000
Number of negative tweets:  5000

The type of all_positive_tweets is:  &lt;class &#39;list&#39;&gt;
The type of a tweet entry is:  &lt;class &#39;str&#39;&gt;
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Let&#39;s look at an example tweet</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Positive example -&gt;&quot;</span><span class="p">,</span> <span class="n">positive_tweets</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span>
<span class="nb">print</span><span class="p">()</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Negative example -&gt;&quot;</span><span class="p">,</span> <span class="n">negative_tweets</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Positive example -&gt; #FollowFriday @France_Inte @PKuchly57 @Milipol_Paris for being top engaged members in my community this week :)

Negative example -&gt; hopeless for tmr :(
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Let's create a Vocabulary by splitting the string on space to get a list of words. This process is known as <em>tokenization</em> and each word is known as <em>token</em>. Then we will take unique words from the training data to build a vocabulary. Also, lowercase the data for simplicity.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Tokenize</span>
<span class="n">positive_tokens</span> <span class="o">=</span> <span class="p">[]</span>
<span class="k">for</span> <span class="n">sent</span> <span class="ow">in</span> <span class="n">positive_tweets</span><span class="p">:</span>
    <span class="c1"># Strip removes trailing white space from string ends.</span>
    <span class="n">positive_tokens</span> <span class="o">+=</span> <span class="n">sent</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)</span>
<span class="n">negative_tokens</span> <span class="o">=</span> <span class="p">[]</span>
<span class="k">for</span> <span class="n">sent</span> <span class="ow">in</span> <span class="n">negative_tweets</span><span class="p">:</span>
    <span class="c1"># Strip removes trailing white space from string ends.</span>
    <span class="n">negative_tokens</span> <span class="o">+=</span> <span class="n">sent</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)</span>

<span class="c1"># Combine all tokens</span>
<span class="n">tokens</span> <span class="o">=</span> <span class="n">positive_tokens</span> <span class="o">+</span> <span class="n">negative_tokens</span>
<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&quot;There are total </span><span class="si">{</span><span class="nb">len</span><span class="p">(</span><span class="n">tokens</span><span class="p">)</span><span class="si">}</span><span class="s2"> tokens.&quot;</span><span class="p">)</span>
<span class="c1"># Now let&#39;s take unique words only to build a vocab</span>
<span class="n">vocab</span> <span class="o">=</span> <span class="nb">list</span><span class="p">(</span><span class="nb">set</span><span class="p">(</span><span class="n">tokens</span><span class="p">))</span>
<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&quot;The vocab size is </span><span class="si">{</span><span class="nb">len</span><span class="p">(</span><span class="n">vocab</span><span class="p">)</span><span class="si">}</span><span class="s2">.&quot;</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="n">vocab</span><span class="p">[:</span><span class="mi">10</span><span class="p">])</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>There are total 116244 tokens.
The vocab size is 26233.
[&#39;&#39;, &#39;paying.&#39;, &#39;@idamelatim&#39;, &#39;z&#39;, &#39;acts&#39;, &#39;predict&#39;, &#39;cc$$,&#39;, &#39;workers&#39;, &#39;@bocagirlslayed&#39;, &#34;where&#39;s&#34;]
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now, we have a vocab and we have to figure out how to create features from these words. One way is one-hot vector using word's index from vocab. Vector in python is simply a list of words of a particular sentence.</p>
<p>Let's see an example</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sample</span> <span class="o">=</span> <span class="n">positive_tweets</span><span class="p">[</span><span class="mi">300</span><span class="p">]</span>
<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&quot;Original Sample: </span><span class="si">{</span><span class="n">sample</span><span class="si">}</span><span class="s2">&quot;</span><span class="p">)</span>
<span class="n">words</span> <span class="o">=</span> <span class="p">[</span><span class="n">vocab</span><span class="o">.</span><span class="n">index</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">sample</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)]</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;number of words/tokens in this example:&quot;</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">words</span><span class="p">))</span>
<span class="nb">print</span><span class="p">(</span><span class="n">words</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Original Sample: Stats for the day have arrived. 2 new followers and NO unfollowers :) via http://t.co/xxlXs6xYwe.
number of words/tokens in this example: 15
[12701, 16763, 21437, 11156, 19218, 20692, 5245, 6068, 13412, 16108, 9842, 18451, 21329, 12676, 12118]
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Here, our one-hot vector will be of size equal to size of vocab, i.e. 26233 in this case and we will one-hot 15 words at given indicies in the example above.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sample_vector</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">vocab</span><span class="p">),</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">int</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Size of sample vector:&quot;</span><span class="p">,</span> <span class="n">sample_vector</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
<span class="c1"># Make one-hot</span>
<span class="n">sample_vector</span><span class="p">[</span><span class="n">words</span><span class="p">]</span> <span class="o">=</span> <span class="mf">1.</span>
<span class="c1"># Verify by counting</span>
<span class="nb">print</span><span class="p">(</span><span class="n">Counter</span><span class="p">(</span><span class="n">sample_vector</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Size of sample vector: (26233,)
Counter({0: 26218, 1: 15})
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now, we need to arrange the samples and split the data for training and validation. I am using pandas and sklearn here.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span>
<span class="kn">from</span> <span class="nn">sklearn.model_selection</span> <span class="kn">import</span> <span class="n">train_test_split</span>
<span class="kn">from</span> <span class="nn">sklearn.linear_model</span> <span class="kn">import</span> <span class="n">LogisticRegression</span>
<span class="kn">from</span> <span class="nn">fastprogress</span> <span class="kn">import</span> <span class="n">progress_bar</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[8]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Use vocab to convert sentences to one-hot vectors</span>
<span class="n">positive_tweets_vectors</span> <span class="o">=</span> <span class="p">[]</span>
<span class="k">for</span> <span class="n">sent</span> <span class="ow">in</span> <span class="n">progress_bar</span><span class="p">(</span><span class="n">positive_tweets</span><span class="p">):</span>
    <span class="n">words</span> <span class="o">=</span> <span class="p">[</span><span class="n">vocab</span><span class="o">.</span><span class="n">index</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">sent</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)]</span>
    <span class="n">sent_vec</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">vocab</span><span class="p">),</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">int</span><span class="p">)</span>
    <span class="n">sent_vec</span><span class="p">[</span><span class="n">words</span><span class="p">]</span> <span class="o">=</span> <span class="mf">1.</span>
    <span class="n">positive_tweets_vectors</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">sent_vec</span><span class="p">)</span>
<span class="n">negative_tweets_vectors</span> <span class="o">=</span> <span class="p">[]</span>
<span class="k">for</span> <span class="n">sent</span> <span class="ow">in</span> <span class="n">progress_bar</span><span class="p">(</span><span class="n">negative_tweets</span><span class="p">):</span>
    <span class="n">words</span> <span class="o">=</span> <span class="p">[</span><span class="n">vocab</span><span class="o">.</span><span class="n">index</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">sent</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)]</span>
    <span class="n">sent_vec</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">vocab</span><span class="p">),</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">int</span><span class="p">)</span>
    <span class="n">sent_vec</span><span class="p">[</span><span class="n">words</span><span class="p">]</span> <span class="o">=</span> <span class="mf">1.</span>
    <span class="n">negative_tweets_vectors</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">sent_vec</span><span class="p">)</span>

<span class="n">positive_tweets_vectors</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="n">positive_tweets_vectors</span><span class="p">)</span>
<span class="n">negative_tweets_vectors</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="n">negative_tweets_vectors</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>



<div class="output_html rendered_html output_subarea ">

    <div>
        <style>
            /* Turns off some styling */
            progress {
                /* gets rid of default border in Firefox and Opera. */
                border: none;
                /* Needs to be in here for Safari polyfill so background images work as expected. */
                background-size: auto;
            }
            .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
                background: #F44336;
            }
        </style>
      <progress value='5000' class='' max='5000' style='width:300px; height:20px; vertical-align: middle;'></progress>
      100.00% [5000/5000 00:15<00:00]
    </div>

</div>

</div>

<div class="output_area">

    <div class="prompt"></div>



<div class="output_html rendered_html output_subarea ">

    <div>
        <style>
            /* Turns off some styling */
            progress {
                /* gets rid of default border in Firefox and Opera. */
                border: none;
                /* Needs to be in here for Safari polyfill so background images work as expected. */
                background-size: auto;
            }
            .progress-bar-interrupted, .progress-bar-interrupted::-webkit-progress-bar {
                background: #F44336;
            }
        </style>
      <progress value='5000' class='' max='5000' style='width:300px; height:20px; vertical-align: middle;'></progress>
      100.00% [5000/5000 00:13<00:00]
    </div>

</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">posdf</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">positive_tweets_vectors</span><span class="p">)</span>
<span class="n">posdf</span><span class="p">[</span><span class="s2">&quot;target&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">negdf</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">negative_tweets_vectors</span><span class="p">)</span>
<span class="n">negdf</span><span class="p">[</span><span class="s2">&quot;target&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">concat</span><span class="p">([</span><span class="n">posdf</span><span class="p">,</span> <span class="n">negdf</span><span class="p">])</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Size of data and features:&quot;</span><span class="p">,</span> <span class="n">df</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Size of data and features: (10000, 26234)
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>If you familier with machine learning algorithms then you already know that this is a huge number of features and it will be computationally more expensive for bigger datasets. Anyway, we will try a logistic regression model just to see how it performs.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Split dataset into training and validation</span>
<span class="n">traindf</span><span class="p">,</span> <span class="n">valdf</span> <span class="o">=</span> <span class="n">train_test_split</span><span class="p">(</span><span class="n">df</span><span class="p">,</span> <span class="n">shuffle</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">stratify</span><span class="o">=</span><span class="n">df</span><span class="o">.</span><span class="n">target</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&quot;Number of samples in training and validation:&quot;</span><span class="p">,</span> <span class="n">traindf</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">valdf</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Number of samples in training and validation: (7500, 26234) (2500, 26234)
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[11]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Verify the classes split</span>
<span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">(),</span> <span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[11]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>(1    3750
 0    3750
 Name: target, dtype: int64,
 1    1250
 0    1250
 Name: target, dtype: int64)</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[12]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="c1"># train model</span>
<span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">drop</span><span class="p">(</span><span class="s2">&quot;target&quot;</span><span class="p">,</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span><span class="o">.</span><span class="n">values</span><span class="p">,</span> <span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>
<span class="n">X_val</span><span class="p">,</span> <span class="n">y_val</span> <span class="o">=</span> <span class="n">valdf</span><span class="o">.</span><span class="n">drop</span><span class="p">(</span><span class="s2">&quot;target&quot;</span><span class="p">,</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span><span class="o">.</span><span class="n">values</span><span class="p">,</span> <span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>
<span class="nb">print</span><span class="p">(</span><span class="n">X_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">X_val</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_val</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>

<span class="n">clf</span> <span class="o">=</span> <span class="n">LogisticRegression</span><span class="p">()</span>
<span class="n">clf</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;training accuracy:&quot;</span><span class="p">,</span> <span class="n">clf</span><span class="o">.</span><span class="n">score</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>(7500, 26233) (7500,) (2500, 26233) (2500,)
training accuracy: 0.9998666666666667
CPU times: user 19.4 s, sys: 438 ms, total: 19.8 s
Wall time: 6.27 s
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[13]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Validation accuracy:&quot;</span><span class="p">,</span> <span class="n">clf</span><span class="o">.</span><span class="n">score</span><span class="p">(</span><span class="n">X_val</span><span class="p">,</span> <span class="n">y_val</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Validation accuracy: 0.9748
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>WOW!! That's really impressive results with a simple logistic regression. Let's test it with our made up sentence</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[14]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">test</span><span class="p">(</span><span class="n">sent</span><span class="p">):</span>
    <span class="c1"># Convert to one-hot vector</span>
    <span class="n">words</span> <span class="o">=</span> <span class="p">[</span><span class="n">vocab</span><span class="o">.</span><span class="n">index</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">sent</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">)]</span>
    <span class="n">sent_vec</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">vocab</span><span class="p">),</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">int</span><span class="p">)</span>
    <span class="n">sent_vec</span><span class="p">[</span><span class="n">words</span><span class="p">]</span> <span class="o">=</span> <span class="mf">1.</span>
    <span class="n">sent_vec</span> <span class="o">=</span> <span class="n">sent_vec</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span>
    <span class="c1"># predict</span>
    <span class="n">y_pred</span> <span class="o">=</span> <span class="n">clf</span><span class="o">.</span><span class="n">predict</span><span class="p">(</span><span class="n">sent_vec</span><span class="p">)</span>
    <span class="k">if</span> <span class="n">y_pred</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="mi">1</span><span class="p">:</span> <span class="k">return</span> <span class="s2">&quot;positive&quot;</span>
    <span class="k">elif</span> <span class="n">y_pred</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span> <span class="k">return</span> <span class="s2">&quot;negative&quot;</span>
    <span class="k">else</span><span class="p">:</span> <span class="k">return</span> <span class="kc">None</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[15]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;I am happy about the results&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[15]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[16]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;This worked out fine.&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[16]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[17]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;I lost my phone&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[17]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;negative&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[18]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;Julia broke up with John&quot;</span><span class="p">)</span> <span class="c1"># What? that&#39;s not good</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[18]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;I forgot my lunch at home&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[19]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;negative&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[20]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;I&#39;m sick&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[20]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;negative&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[21]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;this is a sick beat&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[21]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[22]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;Get away from me&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[22]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;negative&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>So, this worked out well. However, there are some issues:</p>
<ul>
<li>The model took ~12GB RAM while training.</li>
<li>We need other method to create features because one-hot will get expensive with large datasets.</li>
<li>We still need to handle words that are not in the vocab which will raise the below error.</li>
</ul>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[23]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;This tutorial worked out well :)&quot;</span><span class="p">)</span> <span class="c1"># Damn it :(</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_text output_error">
<pre>
<span class="ansi-red-fg">---------------------------------------------------------------------------</span>
<span class="ansi-red-fg">ValueError</span>                                Traceback (most recent call last)
<span class="ansi-green-fg">&lt;ipython-input-23-4607a7e11912&gt;</span> in <span class="ansi-cyan-fg">&lt;module&gt;</span>
<span class="ansi-green-fg">----&gt; 1</span><span class="ansi-red-fg"> </span>test<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">&#34;This tutorial worked out well :)&#34;</span><span class="ansi-blue-fg">)</span> <span class="ansi-red-fg"># Damn it :(</span>

<span class="ansi-green-fg">&lt;ipython-input-14-87f8bb73d130&gt;</span> in <span class="ansi-cyan-fg">test</span><span class="ansi-blue-fg">(sent)</span>
<span class="ansi-green-intense-fg ansi-bold">      1</span> <span class="ansi-green-fg">def</span> test<span class="ansi-blue-fg">(</span>sent<span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">:</span>
<span class="ansi-green-intense-fg ansi-bold">      2</span>     <span class="ansi-red-fg"># Convert to one-hot vector</span>
<span class="ansi-green-fg">----&gt; 3</span><span class="ansi-red-fg">     </span>words <span class="ansi-blue-fg">=</span> <span class="ansi-blue-fg">[</span>vocab<span class="ansi-blue-fg">.</span>index<span class="ansi-blue-fg">(</span>word<span class="ansi-blue-fg">)</span> <span class="ansi-green-fg">for</span> word <span class="ansi-green-fg">in</span> sent<span class="ansi-blue-fg">.</span>lower<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">.</span>strip<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">.</span>split<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">&#34; &#34;</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">]</span>
<span class="ansi-green-intense-fg ansi-bold">      4</span>     sent_vec <span class="ansi-blue-fg">=</span> np<span class="ansi-blue-fg">.</span>zeros<span class="ansi-blue-fg">(</span>len<span class="ansi-blue-fg">(</span>vocab<span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">,</span> dtype<span class="ansi-blue-fg">=</span>int<span class="ansi-blue-fg">)</span>
<span class="ansi-green-intense-fg ansi-bold">      5</span>     sent_vec<span class="ansi-blue-fg">[</span>words<span class="ansi-blue-fg">]</span> <span class="ansi-blue-fg">=</span> <span class="ansi-cyan-fg">1.</span>

<span class="ansi-green-fg">&lt;ipython-input-14-87f8bb73d130&gt;</span> in <span class="ansi-cyan-fg">&lt;listcomp&gt;</span><span class="ansi-blue-fg">(.0)</span>
<span class="ansi-green-intense-fg ansi-bold">      1</span> <span class="ansi-green-fg">def</span> test<span class="ansi-blue-fg">(</span>sent<span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">:</span>
<span class="ansi-green-intense-fg ansi-bold">      2</span>     <span class="ansi-red-fg"># Convert to one-hot vector</span>
<span class="ansi-green-fg">----&gt; 3</span><span class="ansi-red-fg">     </span>words <span class="ansi-blue-fg">=</span> <span class="ansi-blue-fg">[</span>vocab<span class="ansi-blue-fg">.</span>index<span class="ansi-blue-fg">(</span>word<span class="ansi-blue-fg">)</span> <span class="ansi-green-fg">for</span> word <span class="ansi-green-fg">in</span> sent<span class="ansi-blue-fg">.</span>lower<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">.</span>strip<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">.</span>split<span class="ansi-blue-fg">(</span><span class="ansi-blue-fg">&#34; &#34;</span><span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">]</span>
<span class="ansi-green-intense-fg ansi-bold">      4</span>     sent_vec <span class="ansi-blue-fg">=</span> np<span class="ansi-blue-fg">.</span>zeros<span class="ansi-blue-fg">(</span>len<span class="ansi-blue-fg">(</span>vocab<span class="ansi-blue-fg">)</span><span class="ansi-blue-fg">,</span> dtype<span class="ansi-blue-fg">=</span>int<span class="ansi-blue-fg">)</span>
<span class="ansi-green-intense-fg ansi-bold">      5</span>     sent_vec<span class="ansi-blue-fg">[</span>words<span class="ansi-blue-fg">]</span> <span class="ansi-blue-fg">=</span> <span class="ansi-cyan-fg">1.</span>

<span class="ansi-red-fg">ValueError</span>: &#39;tutorial&#39; is not in list</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span>
</pre></div>

    </div>
</div>
</div>

</div>
