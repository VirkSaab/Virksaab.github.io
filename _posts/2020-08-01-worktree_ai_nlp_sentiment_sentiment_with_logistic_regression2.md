---
layout: post
type: "WorkTree"
area: "AI"
subject: "Natural Language Processing (NLP)"
section: "Sentiment Analysis"
title:  "Tweet Sentiment Analysis with Logistic Regression - 2"
author: Jitender Singh Virk
---

<sup>last updated: {{ page.date | date: "%d %b, %Y" }} || Author: {{ page.author }}</sup>

---

[Click here](https://nbviewer.jupyter.org/gist/VirkSaab/cac9a94c8bbfff6c5241849c49385fd0) to view in nbviewer.

Download this notebook from [here](https://gist.github.com/VirkSaab/cac9a94c8bbfff6c5241849c49385fd0)

---

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>This is the second tutorial of <em>Tweet Sentiment Analysis with Logistic Regression</em> series. Check out the first section if you haven't yet.
In this tutorial, we will use another method to create features from sentences. This method is <em>frequency count</em>. This method creates only 3 features rather than 26233 using one-hot!</p>
<p><strong>Frequency count</strong>: Number of times a word appear in particular class corpus. Watch <a href="https://www.coursera.org/learn/classification-vector-spaces-in-nlp/lecture/cITmZ/negative-and-positive-frequencies">this video</a> for clear explanation. After that, watch <a href="https://www.coursera.org/learn/classification-vector-spaces-in-nlp/lecture/j92dt/feature-extraction-with-frequencies">this video</a> for feature extraction using word frequencies.</p>
<p>The data loading process is the same as previous.</p>

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
<span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span>
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
<p>I am using a pandas dataframe for easy data management.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">posdf</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">positive_tweets</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s2">&quot;tweet&quot;</span><span class="p">])</span>
<span class="n">posdf</span><span class="p">[</span><span class="s2">&quot;target&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">negdf</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">negative_tweets</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s2">&quot;tweet&quot;</span><span class="p">])</span>
<span class="n">negdf</span><span class="p">[</span><span class="s2">&quot;target&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="mi">0</span>
<span class="c1"># Combine both dataframes</span>
<span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">concat</span><span class="p">([</span><span class="n">posdf</span><span class="p">,</span> <span class="n">negdf</span><span class="p">])</span>
<span class="n">df</span><span class="o">.</span><span class="n">shape</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[4]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>(10000, 2)</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">sample</span><span class="p">(</span><span class="mi">6</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[5]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>tweet</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1687</th>
      <td>I miss him :(</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3990</th>
      <td>@GODDAMMlT SRSLY FUCK U UNFOLLOWER HOPE UR FUT...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4082</th>
      <td>Never seeing your dad until midnight bc he wor...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4150</th>
      <td>Every year in August I get fever :p dunno why 😷</td>
      <td>1</td>
    </tr>
    <tr>
      <th>899</th>
      <td>Wat a small session tat was :(..but still im l...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>588</th>
      <td>my ankle :(</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Do some cleaning such as converting all text to lowercase, remove hashtags, extra spaces, etc. For the sake of simplicity, I am performing simple cleaning only.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">preprocessing</span><span class="p">(</span><span class="n">tweet</span><span class="p">):</span>
    <span class="c1"># lowercase</span>
    <span class="n">tweet</span> <span class="o">=</span> <span class="n">tweet</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
    <span class="c1"># remove hashtags</span>
    <span class="n">tweet</span> <span class="o">=</span> <span class="n">re</span><span class="o">.</span><span class="n">sub</span><span class="p">(</span><span class="sa">r</span><span class="s1">&#39;#&#39;</span><span class="p">,</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="n">tweet</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">tweet</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s2">&quot;tweet&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="n">df</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">preprocessing</span><span class="p">)</span>
<span class="n">df</span><span class="o">.</span><span class="n">sample</span><span class="p">(</span><span class="mi">6</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[7]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>tweet</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4834</th>
      <td>gotdamn  :-( http://t.co/kkpdlqz2f4</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1899</th>
      <td>@youmeatyours yeah its horrible isn't it :( bi...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4400</th>
      <td>omg when ally hugs mani she wraps her arms aro...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1054</th>
      <td>cause u know ur wrong :) fucking idiot https:/...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1705</th>
      <td>not an apology me encanta vale osea bea :-(</td>
      <td>0</td>
    </tr>
    <tr>
      <th>882</th>
      <td>@belinda_factor stressful :( you not even my d...</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Shuffle the dataframe and split the data into train and validation set</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[8]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">sklearn.model_selection</span> <span class="kn">import</span> <span class="n">train_test_split</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">traindf</span><span class="p">,</span> <span class="n">valdf</span> <span class="o">=</span> <span class="n">train_test_split</span><span class="p">(</span><span class="n">df</span><span class="p">,</span> <span class="n">shuffle</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Shape of train and val set:&quot;</span><span class="p">,</span> <span class="n">traindf</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">valdf</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
<span class="c1"># Verify the classes of both splits</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Samples distribution in train set:&quot;</span><span class="p">,</span> <span class="nb">dict</span><span class="p">(</span><span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()))</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Samples distribution in val set:&quot;</span><span class="p">,</span> <span class="nb">dict</span><span class="p">(</span><span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Shape of train and val set: (7500, 2) (2500, 2)
Samples distribution in train set: {1: 3769, 0: 3731}
Samples distribution in val set: {0: 1269, 1: 1231}
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now let's build word frequencies using training set...</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">build_freqs_dict</span><span class="p">(</span><span class="n">df</span><span class="p">):</span>
    <span class="n">freqs</span> <span class="o">=</span> <span class="p">{}</span>
    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">df</span><span class="p">)):</span>
        <span class="n">row</span> <span class="o">=</span> <span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="n">i</span><span class="p">]</span>
        <span class="n">y</span> <span class="o">=</span> <span class="n">row</span><span class="o">.</span><span class="n">target</span>
        <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">row</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">):</span>
            <span class="n">pair</span> <span class="o">=</span> <span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">y</span><span class="p">)</span>

            <span class="n">freqs</span><span class="p">[</span><span class="n">pair</span><span class="p">]</span> <span class="o">=</span> <span class="n">freqs</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">pair</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span> <span class="o">+</span> <span class="mi">1</span>
            <span class="c1"># The above line is equivalent to if else below but compact</span>
<span class="c1">#             if pair in freqs: freqs[pair] += 1</span>
<span class="c1">#             else: freqs[pair] = 1</span>
    <span class="k">return</span> <span class="n">freqs</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[11]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="n">freqs</span> <span class="o">=</span> <span class="n">build_freqs_dict</span><span class="p">(</span><span class="n">traindf</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>CPU times: user 996 ms, sys: 3.57 ms, total: 999 ms
Wall time: 999 ms
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now, let's make features from the frequencies...
There will be three features for every tweet:</p>
<ul>
<li>Bias: 1 for all tweets</li>
<li>positive frequencies count: Number of words present in freqs dict with target = 1 or positive</li>
<li>negative frequencies count: Number of words present in freqs dict with target = 0 or negative</li>
</ul>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[12]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">make_features</span><span class="p">(</span><span class="n">tweet</span><span class="p">,</span> <span class="n">freqs</span><span class="p">):</span>
    <span class="c1"># Initialize a zeros array with size 3</span>
    <span class="n">feats</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">int</span><span class="p">)</span>
    <span class="c1"># set bias term to 1</span>
    <span class="n">feats</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>

    <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">tweet</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">):</span>
        <span class="c1"># Set positive frequencies count</span>
        <span class="k">if</span> <span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span> <span class="ow">in</span> <span class="n">freqs</span><span class="o">.</span><span class="n">keys</span><span class="p">():</span> <span class="n">feats</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">+=</span> <span class="n">freqs</span><span class="p">[(</span><span class="n">word</span><span class="p">,</span> <span class="mi">1</span><span class="p">)]</span>
        <span class="c1"># Set negative frequencies count</span>
        <span class="k">if</span> <span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span> <span class="ow">in</span> <span class="n">freqs</span><span class="o">.</span><span class="n">keys</span><span class="p">():</span> <span class="n">feats</span><span class="p">[</span><span class="mi">2</span><span class="p">]</span> <span class="o">+=</span> <span class="n">freqs</span><span class="p">[(</span><span class="n">word</span><span class="p">,</span> <span class="mi">0</span><span class="p">)]</span>

    <span class="k">assert</span><span class="p">(</span><span class="n">feats</span><span class="o">.</span><span class="n">shape</span> <span class="o">==</span> <span class="p">(</span><span class="mi">3</span><span class="p">,))</span>
    <span class="k">return</span> <span class="n">feats</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[13]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Test make_features function</span>
<span class="n">sample</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">10</span><span class="p">]</span>
<span class="n">sample_feats</span> <span class="o">=</span> <span class="n">make_features</span><span class="p">(</span><span class="n">sample</span><span class="p">,</span> <span class="n">freqs</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Sample tweet:&quot;</span><span class="p">,</span> <span class="n">sample</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Sample features:&quot;</span><span class="p">,</span> <span class="n">sample_feats</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Sample tweet: @kewlaf i feel u :(
Sample features: [   1  981 4541]
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Make features and train and test model</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[14]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">functools</span> <span class="kn">import</span> <span class="n">partial</span>
<span class="kn">from</span> <span class="nn">sklearn.linear_model</span> <span class="kn">import</span> <span class="n">LogisticRegression</span>
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
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">X_train</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">partial</span><span class="p">(</span><span class="n">make_features</span><span class="p">,</span> <span class="n">freqs</span><span class="o">=</span><span class="n">freqs</span><span class="p">))</span>
<span class="n">X_train</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">stack</span><span class="p">(</span><span class="n">X_train</span><span class="o">.</span><span class="n">values</span><span class="p">)</span>
<span class="n">y_train</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>

<span class="n">X_val</span> <span class="o">=</span> <span class="n">valdf</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">partial</span><span class="p">(</span><span class="n">make_features</span><span class="p">,</span> <span class="n">freqs</span><span class="o">=</span><span class="n">freqs</span><span class="p">))</span>
<span class="n">X_val</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">stack</span><span class="p">(</span><span class="n">X_val</span><span class="o">.</span><span class="n">values</span><span class="p">)</span>
<span class="n">y_val</span> <span class="o">=</span> <span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>

<span class="nb">print</span><span class="p">(</span><span class="n">X_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">X_val</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_val</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>(7500, 3) (7500,) (2500, 3) (2500,)
</pre>
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
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="n">clf</span> <span class="o">=</span> <span class="n">LogisticRegression</span><span class="p">()</span>
<span class="n">clf</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Train accuracy:&quot;</span><span class="p">,</span> <span class="n">clf</span><span class="o">.</span><span class="n">score</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Train accuracy: 0.9349333333333333
CPU times: user 174 ms, sys: 2.36 ms, total: 177 ms
Wall time: 66.9 ms
</pre>
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
<pre>Validation accuracy: 0.9372
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>These are acceptable results. However, we can improve our model by stemming and removing stop words and punctuation.</p>
<p>Let's do it...</p>
<p>We already lowercased and removed hastags. Now, we will perform:</p>
<ul>
<li>removing hyperlinks</li>
<li>using a more sophisticated tokenizer instead of <code>.split</code> method</li>
<li>remove stop words and punctuation</li>
</ul>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[18]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">nltk.corpus</span> <span class="kn">import</span> <span class="n">stopwords</span>          <span class="c1"># module for stop words that come with NLTK</span>
<span class="kn">from</span> <span class="nn">nltk.stem</span> <span class="kn">import</span> <span class="n">PorterStemmer</span>        <span class="c1"># module for stemming</span>
<span class="kn">from</span> <span class="nn">nltk.tokenize</span> <span class="kn">import</span> <span class="n">TweetTokenizer</span>   <span class="c1"># module for tokenizing strings</span>
<span class="kn">from</span> <span class="nn">string</span> <span class="kn">import</span> <span class="n">punctuation</span>             <span class="c1"># common punctuations</span>


<span class="n">stopwords_english</span> <span class="o">=</span> <span class="n">stopwords</span><span class="o">.</span><span class="n">words</span><span class="p">(</span><span class="s1">&#39;english&#39;</span><span class="p">)</span>
<span class="c1"># uncomment below 2 lines to download stopwords</span>
<span class="c1"># import nltk</span>
<span class="c1"># nltk.download(&#39;stopwords&#39;)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">preprocessing2</span><span class="p">(</span><span class="n">tweet</span><span class="p">,</span> <span class="n">tokenizer</span><span class="p">):</span>
    <span class="c1"># remove old style retweet text &quot;RT&quot;</span>
    <span class="n">tweet</span> <span class="o">=</span> <span class="n">re</span><span class="o">.</span><span class="n">sub</span><span class="p">(</span><span class="sa">r</span><span class="s1">&#39;^RT[\s]+&#39;</span><span class="p">,</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="n">tweet</span><span class="p">)</span>\
    <span class="c1"># remove hyperlinks</span>
    <span class="n">tweet</span> <span class="o">=</span> <span class="n">re</span><span class="o">.</span><span class="n">sub</span><span class="p">(</span><span class="sa">r</span><span class="s1">&#39;https?:\/\/.*[\r\n]*&#39;</span><span class="p">,</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="n">tweet</span><span class="p">)</span>
    <span class="c1"># tokenize</span>
    <span class="n">tweet</span> <span class="o">=</span> <span class="n">tokenizer</span><span class="o">.</span><span class="n">tokenize</span><span class="p">(</span><span class="n">tweet</span><span class="p">)</span>
    <span class="c1"># remove stop words and punctuations</span>
    <span class="n">clean_tweet</span> <span class="o">=</span> <span class="p">[</span> <span class="c1"># Go through every word in tokens list</span>
        <span class="n">word</span> <span class="k">for</span> <span class="n">word</span> <span class="ow">in</span> <span class="n">tweet</span>
        <span class="k">if</span> <span class="p">((</span><span class="n">word</span> <span class="ow">not</span> <span class="ow">in</span> <span class="n">stopwords_english</span><span class="p">)</span> <span class="ow">and</span> <span class="p">(</span><span class="n">word</span> <span class="ow">not</span> <span class="ow">in</span> <span class="n">punctuation</span><span class="p">))</span>
    <span class="p">]</span>
    <span class="c1"># Make a string from tokens</span>
    <span class="n">clean_tweet</span> <span class="o">=</span> <span class="s2">&quot; &quot;</span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="n">clean_tweet</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">clean_tweet</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[20]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># instantiate tokenizer class</span>
<span class="n">tokenizer</span> <span class="o">=</span> <span class="n">TweetTokenizer</span><span class="p">(</span><span class="n">preserve_case</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">strip_handles</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">reduce_len</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[21]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="n">df</span><span class="p">[</span><span class="s2">&quot;tweet&quot;</span><span class="p">]</span> <span class="o">=</span> <span class="n">df</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">partial</span><span class="p">(</span><span class="n">preprocessing2</span><span class="p">,</span> <span class="n">tokenizer</span><span class="o">=</span><span class="n">tokenizer</span><span class="p">))</span>
<span class="n">df</span><span class="o">.</span><span class="n">sample</span><span class="p">(</span><span class="mi">6</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>CPU times: user 1.52 s, sys: 83.3 ms, total: 1.6 s
Wall time: 1.07 s
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt output_prompt">Out[21]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>tweet</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4349</th>
      <td>none hiding behind shower curtain :(</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3977</th>
      <td>like u :)</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3642</th>
      <td>hi bam follow bestfriend loves lot :) see wars...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>431</th>
      <td>oh apparently i'm already member lol hopefully...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3220</th>
      <td>funny thing someone said telling life story :(</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3877</th>
      <td>want myungsoo gyu hoya yeol :(</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Split data, build freqs, and train</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[22]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Split data</span>
<span class="n">traindf</span><span class="p">,</span> <span class="n">valdf</span> <span class="o">=</span> <span class="n">train_test_split</span><span class="p">(</span><span class="n">df</span><span class="p">,</span> <span class="n">shuffle</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">test_size</span><span class="o">=.</span><span class="mi">20</span><span class="p">)</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Shape of train and val set:&quot;</span><span class="p">,</span> <span class="n">traindf</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">valdf</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
<span class="c1"># Verify the classes of both splits</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Samples distribution in train set:&quot;</span><span class="p">,</span> <span class="nb">dict</span><span class="p">(</span><span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()))</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Samples distribution in val set:&quot;</span><span class="p">,</span> <span class="nb">dict</span><span class="p">(</span><span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Shape of train and val set: (8000, 2) (2000, 2)
Samples distribution in train set: {1: 4014, 0: 3986}
Samples distribution in val set: {0: 1014, 1: 986}
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[23]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="c1"># Make freqs</span>
<span class="n">freqs</span> <span class="o">=</span> <span class="n">build_freqs_dict</span><span class="p">(</span><span class="n">traindf</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>CPU times: user 1.07 s, sys: 0 ns, total: 1.07 s
Wall time: 1.07 s
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[24]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="c1"># Make features</span>
<span class="n">X_train</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">partial</span><span class="p">(</span><span class="n">make_features</span><span class="p">,</span> <span class="n">freqs</span><span class="o">=</span><span class="n">freqs</span><span class="p">))</span>
<span class="n">X_train</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">stack</span><span class="p">(</span><span class="n">X_train</span><span class="o">.</span><span class="n">values</span><span class="p">)</span>
<span class="n">y_train</span> <span class="o">=</span> <span class="n">traindf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>

<span class="n">X_val</span> <span class="o">=</span> <span class="n">valdf</span><span class="o">.</span><span class="n">tweet</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">partial</span><span class="p">(</span><span class="n">make_features</span><span class="p">,</span> <span class="n">freqs</span><span class="o">=</span><span class="n">freqs</span><span class="p">))</span>
<span class="n">X_val</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">stack</span><span class="p">(</span><span class="n">X_val</span><span class="o">.</span><span class="n">values</span><span class="p">)</span>
<span class="n">y_val</span> <span class="o">=</span> <span class="n">valdf</span><span class="o">.</span><span class="n">target</span><span class="o">.</span><span class="n">values</span>

<span class="nb">print</span><span class="p">(</span><span class="n">X_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_train</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">X_val</span><span class="o">.</span><span class="n">shape</span><span class="p">,</span> <span class="n">y_val</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>(8000, 3) (8000,) (2000, 3) (2000,)
CPU times: user 156 ms, sys: 0 ns, total: 156 ms
Wall time: 154 ms
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[25]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="o">%%time</span>

<span class="c1"># Train and test</span>
<span class="n">clf</span> <span class="o">=</span> <span class="n">LogisticRegression</span><span class="p">()</span>
<span class="n">clf</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>CPU times: user 155 ms, sys: 0 ns, total: 155 ms
Wall time: 39.8 ms
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt output_prompt">Out[25]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>LogisticRegression()</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[26]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Train accuracy:&quot;</span><span class="p">,</span> <span class="n">clf</span><span class="o">.</span><span class="n">score</span><span class="p">(</span><span class="n">X_train</span><span class="p">,</span> <span class="n">y_train</span><span class="p">))</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Validation accuracy:&quot;</span><span class="p">,</span> <span class="n">clf</span><span class="o">.</span><span class="n">score</span><span class="p">(</span><span class="n">X_val</span><span class="p">,</span> <span class="n">y_val</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Train accuracy: 0.990375
Validation accuracy: 0.993
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>WoW! we gain a significant improvement with better preprocessing/</p>
<p>Now. let's test our model with our text...</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[27]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">test</span><span class="p">(</span><span class="n">sent</span><span class="p">):</span>
    <span class="n">sent</span> <span class="o">=</span> <span class="n">preprocessing2</span><span class="p">(</span><span class="n">sent</span><span class="p">,</span> <span class="n">tokenizer</span><span class="p">)</span>
    <span class="n">test_feats</span> <span class="o">=</span> <span class="n">make_features</span><span class="p">(</span><span class="n">sent</span><span class="p">,</span> <span class="n">freqs</span><span class="p">)</span>
    <span class="n">y_pred</span> <span class="o">=</span> <span class="n">clf</span><span class="o">.</span><span class="n">predict</span><span class="p">(</span><span class="n">test_feats</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span><span class="o">-</span><span class="mi">1</span><span class="p">))</span>
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
<div class="prompt input_prompt">In&nbsp;[28]:</div>
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

    <div class="prompt output_prompt">Out[28]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[29]:</div>
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

    <div class="prompt output_prompt">Out[29]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[30]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="nb">print</span><span class="p">(</span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;I lost my phone.&quot;</span><span class="p">))</span> <span class="c1"># This should be negative</span>
<span class="c1"># Why this is positive?</span>
<span class="nb">print</span><span class="p">(</span><span class="n">test</span><span class="p">(</span><span class="s2">&quot;lost&quot;</span><span class="p">))</span> <span class="c1"># returns positive.</span>
<span class="c1"># This might be because the word &quot;lost&quot; is present in the positive freqs for some reason.</span>
<span class="c1"># This could be a drawback of using word frequencies</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>positive
positive
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[31]:</div>
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

    <div class="prompt output_prompt">Out[31]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[32]:</div>
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

    <div class="prompt output_prompt">Out[32]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[33]:</div>
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

    <div class="prompt output_prompt">Out[33]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;negative&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[34]:</div>
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

    <div class="prompt output_prompt">Out[34]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[35]:</div>
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

    <div class="prompt output_prompt">Out[35]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;positive&#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>So <em>frequencies count</em> method is significantly faster and more accurate (at least in validation set). However, further insights are required. Also, we might need more complex features for difficult datasets.</p>

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
