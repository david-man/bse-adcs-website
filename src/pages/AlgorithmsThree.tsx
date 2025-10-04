import InfoDropdown from "../components/InfoDropdown"
import { InlineMath, BlockMath } from 'react-katex';
import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";

function AlgorithmsThree(){
    return <div className = 'w-full h-full flex flex-col items-center gap-[5px]'>
        <h1 className = 'text-3xl w-full text-center m-5'>Algorithms: part 3</h1>
        <InfoDropdown outerString="Bayesian Statistics">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>In ADCS, the only real guarantee that we ever have is that there will be noise and unknown variables. While the previously covered algorithms may have tried to mitigate this through things like weighing of multiple measurements, the algorithms we'll cover in this section use actual statistics to filter through the noise. More specifically, using measurements gathered over time and their relation to a set of <i>state variables</i> (aka, our system state), they try to give the best estimation for said state variables.</p>
                <p className = 'w-full'>So, before we dive in, let's refresh our knowledge about statistics.</p>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-8/10'><i>Note that, while I try to define as much as possible, I assume you already come in with knowledge about basic ideas like means, variances, and standard deviations. Feel free to check out a crash course on statistics if you haven't encountered these before!</i></p>
                <ul className = 'list-disc w-9/10'>
                    <li>probability distributions are functions from <InlineMath>{'\\mathbb{R} \\to [0, 1]'}</InlineMath>.</li>
                    <li>The two types of probability distributions are discrete and continuous ones. We'll be focusing on continuous probability distributions, which have the property <InlineMath>{'\\int_{-\\infty}^{\\infty} \\text{p}(x)dx = 1'}</InlineMath>.</li>
                    <li>The formula for conditional probability states that, if you have two events <InlineMath>{'A, B'}</InlineMath>, that the probability that <InlineMath>{'A'}</InlineMath> happens <i>given</i> that <InlineMath>{'B'}</InlineMath> happens is <InlineMath>{'\\text{p}(A | B) = \\frac{\\text{p}(A \\text{ and } B)}{\\text{p}(B)}'}</InlineMath></li>
                    <li>The formula for conditional probability can be generalized to more than 2 events through the Chain Rule of probability, which states that <InlineMath>{'\\text{p}(A | B \\text { and } C) = \\frac{\\text{p}(A \\text{ and } B | C)}{\\text{p}(B | C)}'}</InlineMath></li>
                    <li>Bayes Formula is a rewriting of the conditional probability formula, and it states that <InlineMath>{'\\text{p}(A | B) = \\frac{\\text{p}(B | A)\\text{p}(A)}{\\text{p}(B)}'}</InlineMath>. In this formula, we call <InlineMath>{'\\text{p}(A)'}</InlineMath> the <i>prior</i> distribution, and we call <InlineMath>{'\\text{p(A | B)}'}</InlineMath> the <i>posterior</i> distribution.</li>
                    <li>Like conditional probability, Bayes Formula can be extended to multiple events through the formula <InlineMath>{'\\text{p}(A | B \\text{ and } C) = \\frac{\\text{p}(B | A \\text{ and } C )\\text{p}(A | C)}{\\text{p}(B | C)}'}</InlineMath></li>
                    <li>In discrete distributions, the law of total probability says that, if you have a set of disjoint (non-overlapping) events <InlineMath>{'\\{X_1, X_2, X_3... X_n\\}'}</InlineMath>, then <InlineMath>{'\\text{p}(\\{X_1, X_2, X_3...X_n\\}) = \\sum_{i = 1}^{N} \\text{p}(X_i)'}</InlineMath></li>
                    <li>The continuous analogous to the above states that, if you have a set of disjoint events that you'd like to consider in a certain space <InlineMath>{'S'}</InlineMath>, then <InlineMath>{'\\text{p}(S) = \\int_S \\text{p}(x)dx'}</InlineMath></li>
                    <li>The law of total probability holds for conditional probabilities and joint probabilities as well. In the continuous case, for some event <InlineMath>{'K'}</InlineMath>, <InlineMath>{'\\text{p}(S | K) = \\int_S \\text{p}(x | K)dx'}</InlineMath> and <InlineMath>{'\\text{p}(K \\text { and } S) = \\int_S \\text{p}(K \\text{ and } x)dx'}</InlineMath></li>
                    <li>Combining the two above, we get the Chapman-Kolmogorov equation, which states that <InlineMath>{'\\text{p}(A \\text{ and } S | K) = \\int_S \\text{p}(A \\text{ and } x | K)dx'}</InlineMath></li>
                    <li>The sum of two random variables <InlineMath>X, Y</InlineMath> has a probability distribution given by <InlineMath>{'\\text{p}_{(X + Y)}(j) = \\int p_X(x)p_Y(j - x)dx'}</InlineMath></li>
                    <li>For some random variable <InlineMath>{'X'}</InlineMath>, the variance is defined by <InlineMath>{'E((X - E(X))(X - E(X)))'}</InlineMath>, where <InlineMath>{'E'}</InlineMath> is the expected value function(the mean).</li>
                    <li>For some random variables <InlineMath>{'X, Y'}</InlineMath>, the covariance is defined by <InlineMath>{'E((X - E(X))(Y - E(Y)))'}</InlineMath>.</li>
                    <li>probability distributions are often extended into the multivariate world through vectors. particularly notable is the transition from the standard deviation to the covariance matrix, which defines how much two random vectors are correlated to each other. The self-covariance(or auto-covariance) matrix, which defines how a vector may be correlated to itself, is a matrix that resembles a form like <img src = 'covariance.jpg' className = 'w-1/2'></img></li>
                    <li>Self-covariance matrices have a special property where, given any random variable <InlineMath>X</InlineMath> and constant matrix <InlineMath>A</InlineMath>, <InlineMath>{'\\text{Cov}(AX) = A\\text{Cov}(X)A^T'}</InlineMath></li>
                    <li>A Gaussian(Normal) random variable is a special random variable defined with the Gaussian probability distribution. In scalar form, the random variable will have some scalar mean and some standard deviation. In vector form, the random variable will have a vector mean and a self-covariance matrix.</li>
                    <li>Gaussian random variables are special in that the result of adding two Gaussian random variables will result in a random variable with a Gaussian probability distribution.</li>
                    <li>If you add a constant <InlineMath>c</InlineMath> to a Gaussian random variable <InlineMath>X</InlineMath>, the result will be a Gaussian random variable with the same standard deviation/covariance whose mean is equal to <InlineMath>E(X) + c</InlineMath>.</li>
                    <li>If you multiply a constant <InlineMath>M</InlineMath> to a Gaussian random variable <InlineMath>X</InlineMath>, the result will be a Gaussian random variable whose mean is equal to <InlineMath>{'M^T(E(X))'}</InlineMath> and whose covariance is equal to <InlineMath>{'\\text{Cov}(MX) = M\\text{Cov}(X)M^T'}</InlineMath></li>
                    <li>If you add a two Gaussian random variables to each other, the result will have a mean that is the sum of the individual means and a covariance that is the sum of the individual covariances.</li>
                </ul>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Bayes Filters">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>While not a very useful filter in of itself, the Bayes filter is the basis for the much more useful Kalman and particle filters.</p>
                <p className = 'w-full'>At the core of the filter is the <i>Hidden Markov Model</i> assumption, which assumes that <b>the current state is only dependent on the last state</b> and that <b>measurements given at time t only depend on the system's state at time t</b>. Note that, because all following filters derive from the Bayes' filter, they all implicitly make these assumptions as well.</p>
                <br />
                <hr className = 'w-full border-2'></hr>
                <br />
                <p className = 'w-8/10 text-center'><i>Notationally, I will be using a comma instead of an "and" from now on.</i></p>
                <p className = 'w-full'>Let's start by defining <InlineMath>{'x_t'}</InlineMath> to be our system state vector at time t. This state vector will contain everything we want to estimate about our system, whether that be things like attitude, position, or anything else. Next, let <InlineMath>{'z_t'}</InlineMath> be the vector of our measurements from whatever devices we have at time t. Finally, let <InlineMath>{'u_t'}</InlineMath> to be the vector of our inputs, like magnetorquer pulses, to the system state at time t.</p>
                <p className = 'w-full'>Let's set our goal to be finding the distribution of <InlineMath>{'x_t'}</InlineMath>. More explicitly, our goal will be to find the probability distribution function <InlineMath>{'\\text{p}(x_t | z_{[0, t]}, u_{[0, t]})'}</InlineMath></p>
                <p className = 'w-full'>To start, let's factor this using Bayes' formula.</p>
                <BlockMath>{`
                \\text{p}(x_t | z_{[0, t]}, u_{[0, t]}) = \\text{p}(x_t | z_t, z_{[0, t - 1]}, u_{[0, t]}) = \\\\
                \\frac{\\text{p}(z_t | x_t, z_{[0, t-1]}, u_{[0, t]})\\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]})}{\\text{p}(z_t | z_{[0, t-1]}, u_{[0, t]})}
                `}</BlockMath>
                <p className = 'w-full'>Now, let's bring in our assumption about measurement independence.</p>
                <BlockMath>
                    {`
                    \\frac{\\text{p}(z_t | x_t, z_{[0, t-1]}, u_{[0, t]})\\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]})}{\\text{p}(z_t | z_{[0, t-1]}, u_{[0, t]})} = \\\\
                    c * \\text{p}(z_t | x_t)\\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]})`}
                </BlockMath>
                <p className = 'w-8/10 text-center'>where c is some proportional constant given by <InlineMath>{'z_t | z_{[0, t-1]}, u_{[0, t]}'}</InlineMath> that ensures the distribution integrates to 1.</p>
                <p className = 'w-full'>Now, let's deal with the <InlineMath>{'\\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]})'}</InlineMath></p>
                <BlockMath>
                    {`
                    \\begin{gather*}
                    \\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]}) = \\\\
                    \\int_{\\text{all events}} p(x_t, x_{t-1} | z_{[0, t-1]}, u_{[0, t]})d(x_{t-1}) = \\\\
                    \\int_{\\text{all events}} p(x_t | x_{t - 1}, z_{[0, t-1]}, u_{[0, t]})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t]})d(x_{t-1}) = \\\\
                    \\text{Using Markov Assumption}\\\\
                    \\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t]})d(x_{t-1}) = \\\\
                    \\text{Noting that future inputs have no effect on current state}\\\\
                    \\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})d(x_{t-1})
                    \\end{gather*}`}
                </BlockMath>
                <p className = 'w-full'>Thus, our final equation is...</p>
                <BlockMath>{`
                    \\text{p}(x_t | z_{[0, t]}, u_{[0, t]}) \\propto \\text{p}(z_t | x_t)\\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})d(x_{t-1})
                `}</BlockMath>
                <p className = 'w-full'>where, to get the estimated value for <InlineMath>{'x_t'}</InlineMath>, we simply calculate</p>
                <BlockMath>{`
                    \\hat{x}_t = E(x_t | z_{[0, t]}, u_{[0, t]})
                `}</BlockMath>
                <p className = 'w-full'>While it may seem relatively ambiguous and unrealizable, notice that the <i>prior calculated distribution</i>, <InlineMath>{'p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})'}</InlineMath>, is right smack dab in the middle! This will be key as we move onto Kalman filters.</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>Kalman filters are an extremely versatile implementation of the Bayes' filter. They implement the filter by making two key assumptions: that noise is Gaussian with zero mean and that the system is linear. We'll explore what this actually means through the math below.</p>
                <br />
                <hr className = 'w-full border-2'></hr>
                <br />
                <p className = 'w-full'>Let's start by unpacking the assumptions.</p>
                <p className = 'w-full'>First, let's run through our assumption about the system being linear. Explicitly, this assumption says that, if we have some <InlineMath>{'x_{t-1}'}</InlineMath>, we can model our current state <InlineMath>{'x_t = A_tx_{t-1} + B_tu_{t}'}</InlineMath>, where <InlineMath>{'A_t, B_t'}</InlineMath> are, respectively, the <i>linear</i> state transition and control input matrices. In addition, this assumption says that our measurements are linearly related to our state through the equation <InlineMath>{'z_t = H_tx_t'}</InlineMath>, where <InlineMath>{'H_t'}</InlineMath> is the measurement matrix.</p>
                <br/>
                <p className = 'w-full'>Of course, though, we have a noise that we assume is Gaussian with zero mean. Extending our previous assumption with this assumption gets us that <InlineMath>{'x_t = A_tx_{t-1} + B_tu_{t} + \\omega_t'}</InlineMath> and <InlineMath>{'z_t = H_tx_t + \\eta_t'}</InlineMath>. Here, <InlineMath>{'\\omega_t'}</InlineMath> is defined as our <i>zero-mean Gaussian process noise random vector</i> with a self-covariance of <InlineMath>Q</InlineMath>, and <InlineMath>{'\\eta_t'}</InlineMath> is our <i>zero-mean Gaussian measurement noise random vector</i> with a self-covariance of <InlineMath>R</InlineMath>. While it might feel like introducing these noise vectors is making things more complex, it'll allow us to actually compensate for the noise in our equations, which will ultimately allow us to make our estimations much more accurate!</p>
                <br/>
                <p className = 'w-full'>To start, let's revisit our Bayes' filter model. More specifically, let's start by honing in on the expression <InlineMath>{'\\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})d(x_{t-1})'}</InlineMath>. Start by noticing that <InlineMath>{'p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})'}</InlineMath> is the prior calculated distribution for our state. If we assume that our prediction for the last state is a Gaussian distribution with mean at <InlineMath>{'\\hat{x}_{t-1}'}</InlineMath>, a covariance of <InlineMath>P</InlineMath>, and a probability distribution function notated by <InlineMath>{'N(\\mu = \\hat{x}_{t-1}, \\Sigma = \\hat{P}_{t - 1})'}</InlineMath> (which is a pretty big assumption that we'll get back to later), we get that </p>
                <BlockMath>{`
                    \\begin{gather*}
                        \\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})d(x_{t-1}) = \\\\
                        \\int_{\\text{all events}} p(x_t | x_{t - 1})N(\\mu = \\hat{x}_{t-1}, \\Sigma = \\hat{P}_{t - 1})d(x_{t-1}) = \\\\
                        \\int_{\\text{all events}} p(A_tx_{t-1} + B_tu_t + \\omega_t | x_{t - 1})N(\\mu = \\hat{x}_{t-1}, \\Sigma = \\hat{P}_{t - 1})d(x_{t-1}) = \\\\
                        \\text{On the left, the noise is the only random variable due to the conditional, so we have}
                        \\\\
                        \\int_{\\text{all events}} p_{\\omega_t}(x_t - (A_tx_{t-1} + B_tu_t)| x_{t - 1})N(\\mu = \\hat{x}_{t-1}, \\Sigma = \\hat{P}_{t - 1})d(x_{t-1}) = 
                        \\\\
                        \\text{Let k be the random variable } Ax_{t - 1} + B_tu_t
                        \\\\
                        \\int_{\\text{all possible values}} p_{\\omega_t}(x_t - (k)| A^{-1}(k - B_tu_t))N(\\mu = E(k), \\Sigma = A\\hat{P}_{t - 1}A^T)d(k)
                    \\end{gather*}
                `}</BlockMath>
                <p className = 'w-full'>We made the assumption that the noise is Gaussian, so we actually have </p>
                <BlockMath>{`
                    \\begin{gather*}
                    \\int_{\\text{all possible values}} N(\\mu = E(x_t - k | A^{-1}(k - B_tu_t)), \\Sigma = Q)N(\\mu = E(k), \\Sigma = APA^T)d(k) = \\\\
                    \\int_{\\text{all possible values}} N(\\mu = E(x_t | A^{-1}k) - E(k | A^{-1}(A^{-1}(k - B_tu_t))), \\Sigma = Q)N(\\mu = E(k), \\Sigma = A\\hat{P}_{t - 1}A^T)d(k) =\\\\
                    \\int_{\\text{all possible values}} N(\\mu = \\hat{x}_t - E(k), \\Sigma = Q)N(\\mu = E(k), \\Sigma = A\\hat{P}_{t - 1}A^T)d(k) = \\\\
                    \\text{This is a summation of random variables that results in the random variable with pdf corresponding to}\\\\
                    N(\\mu = \\hat{x}_t, \\Sigma = A\\hat{P}_{t - 1}A^T + Q) = \\\\
                    N(\\mu = E(Ax_{t-1} + B_tu_t + \\omega_t), \\Sigma = A\\hat{P}_{t - 1}A^T + Q) = \\\\
                    N(\\mu = E(Ax_{t-1}) + E(B_tu_t) + E(\\omega_t), \\Sigma = A\\hat{P}_{t - 1}A^T + Q) = \\\\
                    N(\\mu = A\\hat{x}_{t - 1} + B_tu_t + 0, \\Sigma = A\\hat{P}_{t - 1}A^T + Q)
                    \\end{gather*}
                `}</BlockMath>
                <p className = 'w-full'>Remember that, in the initial Bayes' formula, this random variable corresponds to the random variable with pdf <InlineMath>{'\\text{p}(x_t | z_{[0, t-1]}, u_{[0, t]})'}</InlineMath>. Let's call this Gaussian variable the resultant of the <i>predict step</i>, where it's clear that its expected value, <InlineMath>{'\\hat{x}_{t_{pred}}'}</InlineMath> is simply the result of <InlineMath>{'A\\hat{x}_{t - 1} + B_tu_t'}</InlineMath> and its covariance, <InlineMath>{'\\hat{P}_{t_{pred}}'}</InlineMath> is simply the value <InlineMath>{'A\\hat{P}_{t - 1}A^T'}</InlineMath></p>
                <br />
                <p className = 'w-full'>A key thing to notice here is that the predicted covariance is almost guaranteed to be <i>larger</i> than the initial covariance coming in. Intuitively, this is because we've added process noise without any compensation, which isn't ideal.</p>
                <p className = 'w-full'>Fortunately, recall that in the Bayes formula, we didn't only have this prediction random variable; we also had the random variable <InlineMath>{'p(z_t | x_t)'}</InlineMath>. Using this term to compensate for our noise will be known as the <i>update step</i>.</p>
                <br/>
                <p className = 'w-full'>Filling in our assumptions about measurements, consider that our equation has now become</p>
                <BlockMath>
                    {`
                    p(x_t) \\propto p(z_t | x_t) N(\\mu = \\hat{x}_{t_{pred}}, \\Sigma = \\hat{P}_{t_{pred}})(x_t) = \\\\
                    p(Hx_t + \\eta_t | x_t) N(\\mu = \\hat{x}_{t_{pred}}, \\Sigma = \\hat{P}_{t_{pred}})(x_t) = \\\\
                    \\text{On the left, the noise is the only random variable due to the conditional, so we have}\\\\
                    p_{\\eta_t}(z_t - Hx_t)N(\\mu = \\hat{x}_{t_{pred}}, \\Sigma = \\hat{P}_{t_{pred}})(x_t)
                    `}
                </BlockMath>
                <p className = 'w-full'>Assuming that <InlineMath>{'\\hat{P}_{t_{pred}}'}</InlineMath> is positive semi-definite and that the measurement noise is zero-mean Gaussian, we can expand these into their <ExternalLink link = "https://en.wikipedia.org/wiki/Multivariate_normal_distribution">true algebraic forms</ExternalLink></p>
                <BlockMath>
                    {`
                    \\begin{gather*}
                    \\propto \\exp(-\\frac{1}{2}(z_t - Hx_t)^TR^{-1}(z_t - Hx_t))\\exp(-\\frac{1}{2}(x_t - \\hat{x}_{t_{pred}})^T\\hat{P}_{t_{pred}}^{-1}(x_t - \\hat{x}_{t_{pred}})) = \\\\
                    \\exp(-\\frac{1}{2}((z_t - Hx_t)^TR^{-1}(z_t - Hx_t) + (x_t - \\hat{x}_{t_{pred}})^T\\hat{P}_{t_{pred}}^{-1}(x_t - \\hat{x}_{t_{pred}}))) = \\\\
                    \\exp(-\\frac{1}{2}((z_t^T - x_t^TH^T)R^{-1}(z_t - Hx_t) + (x_t^T - \\hat{x}_{t_{pred}}^T)\\hat{P}_{t_{pred}}^{-1}(x_t - \\hat{x}_{t_{pred}}))) = \\\\
                    \\exp(-\\frac{1}{2}((z_t^TR^{-1} - x_t^TH^TR^{-1})(z_t - Hx_t) + (x_t^T\\hat{P}_{t_{pred}}^{-1} - \\hat{x}_{t_{pred}}^T\\hat{P}_{t_{pred}}^{-1})(x_t - \\hat{x}_{t_{pred}}))) = \\\\
                    \\exp(-\\frac{1}{2}(z_t^TR^{-1}z_t - z_t^TR^{-1}Hx_t - x_t^TH^TR^{-1}z_t + x_t^TH^TR^{-1}Hx_t + \\\\
                    x_t^T\\hat{P}_{t_{pred}}^{-1}x_t - x_t^T\\hat{P}_{t_{pred}}^{-1}\\hat{x}_{t_{pred}} - \\hat{x}_{t_{pred}}^T\\hat{P}_{t_{pred}}^{-1}x_t + \\hat{x}_{t_{pred}}^T\\hat{P}_{t_{pred}}^{-1}\\hat{x}_{t_{pred}})) = \\\\
                    \\exp(-\\frac{1}{2}(x_t^T(H^TR^{-1}H + \\hat{P}_{t_{pred}}^{-1})x_t - 2x_t^T(H^TR^{-1}z_t + \\hat{P}_{t_{pred}}^{-1}\\hat{x}_{t_{pred}}) + C))
                    \\end{gather*}
                    `}
                </BlockMath>
                <p className = 'w-full'>We technically don't know if it's possible, but let's see if we can get a Gaussian distribution out of this with probability distribution</p>
                <BlockMath>
                    {`
                    N(\\mu = \\hat{x}_t, \\Sigma = \\hat{P}_t)(x_t)
                    = \\exp(-\\frac{1}{2}(x_t - \\hat{x}_t)^T\\hat{P}_t^{-1}(x_t - \\hat{x}_t)) = \\\\
                    \\exp(-\\frac{1}{2}((x_t^T\\hat{P}_t^{-1} - \\hat{x}_t^T\\hat{P}_t^{-1})(x_t - \\hat{x}_t))) = \\\\
                    \\exp(-\\frac{1}{2}(x_t^T\\hat{P}_t^{-1}x_t - 2x_t^T\\hat{P}_t^{-1}\\hat{x}_t + C)) =
                    `}
                </BlockMath>
                <p className = 'w-full'>It's pretty easy to see that <InlineMath>{`
                \\hat{P}_t^{-1} = H^TR^{-1}H + \\hat{P}_{t_{pred}}^{-1}
                `}</InlineMath>. Then, we have</p>
                <BlockMath>
                    {`
                    \\begin{gather*}
                    \\hat{P}_t^{-1}\\hat{x}_t = (H^TR^{-1}z_t + \\hat{P}_{t_{pred}}^{-1}\\hat{x}_{t_{pred}}) \\\\
                    \\to \\hat{x}_t = \\hat{P}_t(H^TR^{-1}z_t + \\hat{P}_{t_{pred}}^{-1}\\hat{x}_{t_{pred}})
                    \\end{gather*}
                    `}
                </BlockMath>
                <p className = 'w-full'>And there it is - the update step of the Kalman filter. To recap, in this step, we <i>updated</i> our initial estimate using the measurements, ending up with a Gaussian distribution for our state estimate with the form</p>
                <BlockMath>
                    {`
                    \\begin{gather*}
                    p(x_t) \\propto N(\\mu = \\hat{x}_{t}, \\Sigma = \\hat{P}_t)\\\\
                    \\hat{P}_t = (H^TR^{-1}H + \\hat{P}_{t_{pred}}^{-1})^{-1}\\\\
                    \\hat{x}_t = \\hat{P}_t(H^TR^{-1}z_t + \\hat{P}_{t_{pred}}^{-1} \\hat{x}_{t_{pred}})
                    \\end{gather*}
                    `}
                </BlockMath>
                <p className = 'w-full'>While this form is a valid form of the Kalman filter known as the information form, we often times rewrite this using </p>
                <BlockMath>
                    {`
                    \\begin{gather*}
                    p(x_t) \\propto N(\\mu = \\hat{x}_{t}, \\Sigma = \\hat{P}_t)\\\\
                    K = \\hat{P}_{t_{pred}}H^T(H^T\\hat{P}_{t_{pred}}H + R)^{-1}\\\\
                    \\hat{P}_t = (I - KH)\\hat{P}_{t_{pred}}\\\\
                    \\hat{x}_t = \\hat{x}_{t_{pred}} + K(z_t - H\\hat{x}_{t_{pred}})
                    \\end{gather*}
                    `}
                </BlockMath>
                <p className = 'w-full'>Now, all there is to do is to move one timestep forward and repeat this process all over again :)</p>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br />
                <p className = 'w-full'>The biggest issue with the Kalman filter, of course, is its linear assumption, which is an assumption that doesn't hold for non-linear (aka, 99.999% of real life) systems. In fact, pretty much every addition to the Kalman filter is an attempt to mitigate this issue.</p>
                <br />
                <p className = 'w-full'>That doesn't mean that Kalman filter is a bad filter, though! In fact, though computationally complex due to the calculations of matrix inverses, it's still an extremely versatile filter used nearly everywhere (not just in ADCS!).</p>
                <br />
                <p className = 'w-full'>That was probably a lot to take in. Feel free to take a break before moving onto the next sections. I promise the math won't get any more tedious than this :)</p>
                <br />
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-full'><b>DANGER</b> : Like the filters discussed in the past, a keen eye would have you notice that this filter never explicitly determines a state <InlineMath>{'x'}</InlineMath> and a covariance <InlineMath>{'P'}</InlineMath>. Thus, you as the developer need to give an initial estimate, and while Kalman filters will eventually converge even under suboptimal estimates, the time to convergence may substantially increase with a bad guess.</p>
                <br />
                <p className = 'w-full'>In the beginning, we assumed that the probability distribution coming in would be a Gaussian. It's pretty easy to see this for any <InlineMath>{'t > 0'}</InlineMath>; after all, we're outputting a Gaussian out of both the predict and update steps. For <InlineMath>{'t = 0'}</InlineMath>, you're going to have to just assume that the value you initially estimate as the developer is itself normally distributed with mean <InlineMath>{'x_0'}</InlineMath> and a covariance <InlineMath>{'P_0'}</InlineMath>. Remember, though, that your estimate shouldn't just be anything!</p>
                <br/>
                <p className = 'w-full'></p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Extended Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>As mentioned in the previous section, almost all innovations on the Kalman filter deal with the issue laid out by the Kalman's linear assumption. </p>
                <p className = 'w-full'>The Extended Kalman Filter (or EKF) simply does this by approximating a non-linear function through its first derivative. More explicitly, it assumes that, for some state transition function <InlineMath>f(x, u)</InlineMath>, some measurement function <InlineMath>g(x)</InlineMath>, and a small period of time <InlineMath>{'\\Delta t '}</InlineMath>...</p>
                <BlockMath>
                    {`
                    A = \\Delta t * \\nabla f(t), H = \\Delta t * \\nabla g(t)\\\\
                    \\nabla \\text{ denotes the Jacobian}
                    `}
                </BlockMath>
                <p className = 'w-full'>Mostly every other part of the Kalman filter is then left the same, with the exceptions being that you replace all the following variables like such...</p>
                <BlockMath>
                    {`
                    A\\hat{x}_{t_{pred}} + B_tu_t\\to f(\\hat{x}_{t - 1}, u_{t})\\\\
                    H\\hat{x}_{t_{pred}} \\to g(\\hat{x}_{t_{pred}})
                    `}
                </BlockMath>
                <p className = 'w-full'>While it might not seem like the biggest advancement, its simplicity is what makes the Extended Kalman Filter the most popular form of the Kalman filter to date.</p>
                <br />
                <hr className = 'w-full border-2'></hr>
                <br />
                <p className = 'w-full'>A common pitfall in the EKF is the issue of difficult-to-differentiate state transition or measurement functions. In those cases, when even taking a Jacobian is difficult, it's recommended to either
                    
                </p>
                <ul className = 'list-disc w-9/10'>
                        <li>Estimate each partial through taking a derivative using <InlineMath>{'\\frac{f(x + h) - f(x)}{|h|}'}</InlineMath>, where h is a vector corresponding to a small change in one variable.</li>
                        <li>Just use a different algorithm.</li>
                    </ul>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Multiplicative Extended Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>
                {/* https://arxiv.org/pdf/1711.02508 */}
                <p className = 'w-full'>The unfortunate part about the Extended Kalman Filter is that it makes the assumption that your state can take on any value and that its an additive system. While that assumption accomodates a lot of systems, as we know, rotation quaternions explicitly aren't one of them.</p>
                <br/>
                <p className = 'w-full'>In the past, for quaternion estimation with the EKF, people used to just normalize the value coming out of the EKF after every timestep. Unfortunately, that boggles up the math to the point where the Kalman filter might not actually function.</p>
                <br/>
                <p className = 'w-full'>Thus, the Multiplicative Extended Kalman Filter(MEKF), which has built in support for the multiplicative nature of quaternions, was introduced.</p>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br />
                <p className = 'w-full'><i>This section uses some information from the <Link to = {'/rotations'} className = 'underline text-blue-500'>quaternions</Link> section. Feel free to brush up on it if necessary.</i></p>
                <br/>
                <p className = 'w-full'>While an intuitive first idea might be just to include the quaternion as a part of the state vector, the MEKF avoids that. Instead, they attempt to estimate a small error quaternion given by <InlineMath>{'\\delta q'}</InlineMath>. As mentioned in the quaternion section, as the time delta approaches 0, this can be approximated by...</p>
                <BlockMath>
                    {`
                    \\delta q \\approx [1, \\frac{\\theta_x}{2}, \\frac{\\theta_y}{2}, \\frac{\\theta_z}{2}], \\mathbf{\\theta} \\text{ is a rotation vector}
                    `}
                </BlockMath>
                <p className = 'w-full'>So, instead of directly estimating the quaternion, we'll rotate the quaternion by the rotation vector <i>outside of the filter</i>, while trying to estimate the error rotation <i>inside the filter</i>.</p>
                <br />
                <p className = 'w-full'>To start, the standard MEKF definition has a nominal state, consisting of a rotation quaternion from body to world <InlineMath>q</InlineMath> and a gyroscope bias <InlineMath>b</InlineMath> contained in a state <InlineMath>{'x = [q, b]^T'}</InlineMath>. In addition to that, it has 6 element Kalman state <InlineMath>{'\\delta x'}</InlineMath> containing the estimated small error rotation vector and a small additive gyroscope bias error vector, where <InlineMath>{'\\omega_{gyro} = \\omega_{true} + (\\hat{b} + b_{err})'}</InlineMath>. This will make things a little confusing, as you'll see, but bear with me.</p>
                <p className = 'w-full'>In the predict step of the filter, we'll first propagate the nominal state forward through the equation</p>
                <BlockMath>
                    {`
                    \\hat{q}_{t_{pred}} = \\text{normalize}(\\hat{q}_{t - 1} + \\frac{1}{2} \\hat{q}_{t - 1}(\\omega_{gyro} - \\hat{b})_{pure})
                    `}
                </BlockMath>
                <p className = 'w-full'>Then, we'll propagate the Kalman state forward. The way to do this is by considering, first, that the continuous dynamics of the systems, as given by <ExternalLink link = "https://arxiv.org/pdf/1711.02508">Sola</ExternalLink> is...</p>
                <BlockMath>
                    {`
                    \\hat{\\delta q}_{pred} = \\delta q + (-[\\omega_{gyro} - \\hat{b} ]_{\\times} \\delta q_{t - 1} - b_{err_{t - 1}})\\\\
                    \\hat{b_{err_{pred}}} = b_{err_{t - 1}}\\\\
                    \\times \\text{ denotes the cross product or skew-symmetric matrix}
                    `}
                </BlockMath>
                <p className = 'w-full'>From this, it follows that we can approximate an A</p>
                <BlockMath>{`
                    A \\approx \\begin{pmatrix}
                    I_{3 x 3} -[\\omega_{gyro} - \\hat{b} ]_{\\times}\\Delta t & -I\\Delta t \\\\
                    0 & I_{3x3}
                    \\end{pmatrix}
                `}</BlockMath>
                <p className = 'w-full '>Defining the process noise matrix Q with the variance of the gyro noise on the upper 3 values on the main diagonal and the variance of the gyro bias noise on the lower 3 values on the main diagonal will get you a decent estimate.</p>
                <p className = 'w-full'>With just these, you can go through the predict step of the Kalman filter, updating both the state estimate of the errors and the covariance.</p>
                <br/>
                <p className = 'w-full'>The biggest issue with the MEKF is this next step; the update step's Jacobian calculation. Theoretically, it's calculatable via the chain rule, whereby, given some measurement function <InlineMath>h(x)</InlineMath>, we have</p>
                <BlockMath>
                    {`
                        H = \\frac{\\partial h}{\\partial \\delta x} = \\frac{\\partial h}{\\partial x} * \\frac{\\partial x}{\\partial \\delta x}
                    `}
                </BlockMath>
                <p className = 'w-full'>Deriving <InlineMath>{'\\frac{\\partial x}{\\partial \\delta x}'}</InlineMath> isn't the worst. To start, the partial derivative of the nominal quaternion w.r.t the bias error is 0, and the partial derivative of the bias w.r.t the quaternion error is 0. Then, the partial derivative of the bias w.r.t the bias error, as stated in the initial system setup, is just <InlineMath>{'I_{3x3}'}</InlineMath>. What remains, then, is the partial derivative of the nominal quaternion w.r.t the quaternion error. This is solved again by <ExternalLink link = "https://arxiv.org/pdf/1711.02508">Sola</ExternalLink>, who derives it as </p>
                <BlockMath>
                    {`
                    \\mathbf{Q} = \\frac{1}{2}\\begin{pmatrix}
                        -{\\hat{q}_{pred}}_x & -{\\hat{q}_{pred}}_y & -{\\hat{q}_{pred}}_z\\\\
                        {\\hat{q}_{pred}}_w & -{\\hat{q}_{pred}}_z & {\\hat{q}_{pred}}_y\\\\
                        {\\hat{q}_{pred}}_z & {\\hat{q}_{pred}}_w & -{\\hat{q}_{pred}}_x\\\\
                        -{\\hat{q}_{pred}}_y & {\\hat{q}_{pred}}_x & {\\hat{q}_{pred}}_w
                    \\end{pmatrix}
                    \\\\
                    \\frac{\\partial x}{\\partial \\delta x} = \\begin{pmatrix}
                        \\mathbf{Q} & 0_{4x3} \\\\
                        0_{3x3} & I_{3x3}
                    \\end{pmatrix}
                    `}
                </BlockMath>
                <p className = 'w-full'>Ultimately, though, it may be better solved simply by using the methods discussed in the EKF section.</p>
                <p className = 'w-full'>Now that you have your A, H, and predictions, you can continue forward as usual with the update steps. </p>
                <br/>
                <p className = 'w-full'>At the end of the update step, a few small things have to occur. </p>
                <br />
                <p className = 'w-full'>Firstly, the predicted quaternion needs to get updated with the new rotation error vector through <InlineMath>{'\\hat{q}_t = \\hat{q}_{t_{pred}}\\delta_q'}</InlineMath> and the predicted bias needs to get updated through <InlineMath>{'b_t = \\hat{b} + b_{err}'}</InlineMath>. </p>
                <br />
                <p className = 'w-full'>Then, we need to <i>reset the system</i> by turning all errors back to 0. This is because we're not directly measuring the system state itself -- rather, we're estimating how off it is. Theoretically, if our error vectors were perfect, we should now have 0 error rather than the same as before, which is why this step is essential.</p>
                <br />
                <p className = 'w-full'>Of course, this calls into question the nature of our covariance matrix. For our purposes, the impact is negligible, though <ExternalLink link = "https://arxiv.org/pdf/1711.02508">Sola</ExternalLink> does mention a slight update you can do if you have enough information.</p>
                <br />
                <hr className = 'w-full border-2'/>
                <br/>
                <p className = 'w-full'>
                    The MEKF is one of the most well-known attitude-specific Kalman filters, and basic versions of it are still widely used in satellites today. However, though it certainly made improvements compared to its EKF predecessor, it is still ultimately constrained by the necessity of linearization and approximations.
                </p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Unscented Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>The Unscented Kalman Filter is a recent development that attempts to improve on the EKF by improving its approximations. Specifically, rather than having to tediously figure out Jacobians, the UKF chooses to keep the functions in their initial states.</p>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-full'>Let's start by assuming that we're coming in with a prior Gaussian distribution described by a mean <InlineMath>{'\\mu'}</InlineMath> and a covariance <InlineMath>P</InlineMath>. Next, let's recall that all smooth functions can be perfectly approximated by their infinite Taylor Series expansion at any point; i.e <InlineMath>{'f(x) = f(x_i) + f\'(x_i)(x - x_i) + \\frac{1}{2}f\'\'(x_i)(x - x_i)^2...'}</InlineMath>. While we know first order approximations get really bad really fast, let's consider a second order approximation of f as <InlineMath>{'f(x) \\approx f(x_i) + f\'(x_i)(x - x_i) + \\frac{1}{2}f\'\'(x_i)(x - x_i)^2'}</InlineMath>. </p>
                <br />
                <p className = 'w-full'>It follows that we can approximate the mean of this function through <InlineMath>{'E(f(x)) \\approx E(f(\\mu)) + E(f\'(\\mu))(x - \\mu) + E(\\frac{1}{2}f\'\'(\\mu)(x - \\mu)^2)'}</InlineMath> </p>
                <p className = 'w-full'>Using the fact that <InlineMath>{'E(x - \\mu) = E(x) - \\mu = 0'}</InlineMath> and <InlineMath>{'P = E((x - \\mu)^2'}</InlineMath> by definition, we can simplify this into <InlineMath>{'E(f(x)) \\approx f(\\mu) + \\frac{1}{2}f\'\'(\\mu)P'}</InlineMath></p>
                <br />
                <p className = 'w-full'>Using this approximation, we can now also approximate the covariance of this function through</p>
                 <BlockMath>{`
                 \\begin{gather*}
                 Cov(f(x)) = E((f(x) - E(f(x)))^2) \\\\
                 \\approx E((f\'(x)(x - \\mu) + \\frac{1}{2}f\'\'(\\mu)((x-\\mu)^2 - P))^2)\\\\
                 = E(((f\'(x)(x - \\mu))^2 + (f\'(x)(x - \\mu))(f\'\'(\\mu)((x-\\mu)^2 - P)) + (f\'\'(\\mu)((x-\\mu)^2 - P))^2)
                 \\end{gather*}
                 `}</BlockMath>
                 <p className = 'w-full'>Given that the <InlineMath>{'E((x - \\mu)^3) = 0'}</InlineMath> for the symmetric incoming Gaussian and that we don't care about any 3rd+ order terms, we can approximate this with <InlineMath>{'E((f\'(x)(x - \\mu)^2) = f\'(x)Pf\'(x)^T'}</InlineMath></p>
                 <br />
                 <p className = 'w-full'>Okay, so what have we actually shown? Well, we've shown that, if we're passing in a distribution to a smooth function, the mean of the output can be approximated once you have the second derivative term, and the covariance of the output can be approximated once you have the first derivative term. What now?</p>
                 <br />
                 <p className = 'w-full'>Well, let's try creating a set of 2n + 1 points <InlineMath>{'s'}</InlineMath> with weights <InlineMath>{'W^m_i, W^c_i'}</InlineMath>, that satisfy the property <InlineMath>{'\\sum W^m_i (s - \\mu) = 0 \\newline \\sum W^c_i (s - \\mu)(s - \\mu)^T = \\sum W^m_i (s - \\mu)(s - \\mu)^T = P'}</InlineMath>. What happens when we push these points through f(x)?</p>
                 <br />
                 <p className = 'w-full'>The mean we would get would be <InlineMath>{'\\sum W^m_i f(s)'}</InlineMath>. Using the Taylor expansion again, this expands to</p>
                 <BlockMath>
                    {`
                    \\hat{\\mu}_{approx} = \\sum W^m_i f(s) \\approx \\\\
                    \\sum W^m_i[f(\\mu) + f\'(\\mu)(s - \\mu) + \\frac{1}{2}f\'\'(\\mu)(s - \\mu)(s-\\mu)^T] = \\\\
                    \\sum W^m_i[f(\\mu)] + \\sum W^m_i f\'(\\mu)(s - \\mu) + \\frac{1}{2}\\sum W^m_if\'\'(\\mu)(s - \\mu)(s-\\mu)^T] = \\\\
                    f(\\mu) + f\'(\\mu)\\sum W^m_i (s - \\mu) + \\frac{1}{2}f\'\'(\\mu)W^m_i\\sum (s - \\mu)(s-\\mu)^T = \\\\
                    f(\\mu) + \\frac{1}{2}\\sum f\'\'(\\mu)(s - \\mu)(s-\\mu)^T = \\\\
                    f(\\mu) + \\frac{1}{2}f\'\'(\\mu)P \\approx E(f(x))
                    `}
                 </BlockMath>
                 <p className = 'w-full'>That's great, isn't it! We've managed to approximate <InlineMath>E(f(x))</InlineMath> with just a few points! But what about the covariance? Well...</p>
                 <BlockMath>
                    {`
                    \\hat{P}_{approx} = \\sum W^c_i (f(s) - f(\\mu))(f(s) - f(\\mu))^T \\approx
                    \\\\
                    \\sum W^c_i (f(\\mu) + f\'(\\mu)(s - \\mu) - f(\\mu))(f(\\mu) + f\'(\\mu)(s - \\mu) - f(\\mu))^T = 
                    \\\\
                    \\sum W^c_i (f\'(\\mu)(s - \\mu))(f\'(\\mu)(s - \\mu))^T = \\\\
                    f\'(\\mu) (\\sum W^c_i (s - \\mu)(s - \\mu)^T)f\'(\\mu)^T = \\\\
                    f\'(\\mu) P f\'(\\mu)^T \\approx Cov(f(x))
                    `}
                 </BlockMath>
                 <p className = 'w-full'>In other words, we've just found a set of points that can approximate both the mean and covariance of a distribution coming out of a function. In fact, it turns out that these points, called sigma points, actually approximate the mean and covariance <i>better</i> than the linearizations made by the Extended Kalman Filter.</p>
                 <br />
                 <p className = 'w-full'>All that's left to determine is how actually to define these points. A common tactic is determined by the following algorithm:</p>
                 <ol className = 'list-decimal w-9/10'>
                    <li>Define your first point as the mean of the incoming distribution <InlineMath>{'\\mu'}</InlineMath> with dimension <InlineMath>n</InlineMath></li>
                    <li>Assuming that your incoming distribution has covariance <InlineMath>{'P'}</InlineMath>, calculate <InlineMath>{'L = \\sqrt{(n + \\lambda)P}'}</InlineMath>, where the matrix square-root is calculated using <ExternalLink link = 'https://en.wikipedia.org/wiki/Cholesky_decomposition'>Cholesky Decomposition</ExternalLink> and <InlineMath>{'\\lambda'}</InlineMath> is a scaling parameter defined by two spread parameters <InlineMath>{'\\alpha^2(n+\\kappa) - n'}</InlineMath> with typical values <InlineMath>{'\\alpha = 0.001, \\kappa = 0'}</InlineMath></li>
                    <li>Set the next <InlineMath>n</InlineMath> points to be of the form <InlineMath>{'\\mu + (L[i])'}</InlineMath>, where <InlineMath>{'L[i]'}</InlineMath> corresponds to the i'th column of L.</li>
                    <li>Then, set the <InlineMath>n</InlineMath> points after that to be of the form <InlineMath>{'\\mu - (L[i])'}</InlineMath></li>
                    <li>For <InlineMath>W^m_i</InlineMath>, set <InlineMath>{'W^m_0 = \\frac{\\lambda}{n + \\lambda}'}</InlineMath> and <InlineMath>{'W^m_i = \\frac{1}{2(n + \\lambda)}'}</InlineMath> for all others.</li>
                    <li>For <InlineMath>W^c_i</InlineMath>, set <InlineMath>{'W^c_0 = \\frac{\\lambda}{n + \\lambda} + 1 - \\alpha^2 + \\beta'}</InlineMath>, where <InlineMath>{'\\beta'}</InlineMath> tells you how much prior information to incorporate and is usually set to 2 for Gaussian distributions. Then, <InlineMath>{'W^c_i = W^m_i = \\frac{1}{2(n + \\lambda)}'}</InlineMath> for all others.</li>
                 </ol>
                 <p className = 'w-full'>With these initialization steps out of the way, the filter can go through its predict step just like any other Kalman filter, whereby, following from our earlier demonstration, we have...</p>
                 <BlockMath>
                    {`
                    \\hat{x_{pred}} = \\sum W^{m}_i f(s_i)\\\\
                    \\hat{P_{pred}} = \\sum W^{c}_i (f(s_i) - \\hat{x_{pred}})(f(s_i) - \\hat{x_{pred}})^T + Q \\\\
                    \\text{Q is some process noise}
                    `}
                 </BlockMath>
                 <p className = 'w-full'>Next, during the update step, we need to use our measurements to find out how likely these sigma points are to being the actual state. To do this, we run through this algorithm</p>
                 <BlockMath>
                    {`
                    \\begin{gather*}
                    \\hat{z} = \\sum W^m_i g(f(s_i))\\\\
                    P_z = \\sum W^c_i (g(f(s_i)) - \\hat{z})(g(f(s_i)) - \\hat{z})^T + R\\\\
                    P_{sz} = \\sum W^c_i (f(s_i) - \\hat{x_{pred}})(g(f(s_i) - z)^T\\\\
                    K = P_{sz}P_z^{-1}\\\\
                    \\hat{x} = \\hat{x_{pred}} + K(z - \\hat{z})\\\\
                    \\hat{P} = \\hat{P_{pred}} - KP_{z}K^T
                    \\end{gather*}
                    `}
                 </BlockMath>
                 <p className = 'w-full'>And that's the Unscented Kalman Filter!</p>
                <br/>
                <hr className = 'w-full border-2'/>
                <br/>
                <p className = 'w-full'>Whew! What a journey, right? 4 Kalman filters, too much math, but we're finally here. While technically more computationally complex than the EKF in deterministic situations, Unscented Kalman Filters actually improve on the EKF when you don't have an explicit Jacobian. For this reason, as well as it technically being more powerful (as briefly mentioned above), I think they are one of if not the best approach for attitude determination.</p>
                <br/>
                <p className = 'w-full'>It's been a while. Stretch. Get some air. Pat yourself on the back. You've done it! :) (Of course, feel free to use the help menu or contact me directly if you have any questions)</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Particle Filter">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'><b>This section is optional! Don't feel pressured to read it if you don't care.</b></p>
                <br />
                <p className = 'w-full'>While Kalman filters are the primary implementation of the Bayes' filter, the Particle filter is an up-and-coming rival.</p>
                <p className = 'w-full'>In exchange for making even fewer assumptions than any of the Kalmans and being more generalizable, the Particle Filter is considerably more computationally costly. For that reason, it's not really worth considering for a CubeSat, where resources are more limited.</p>
                <br />
                <hr className = 'w-full border-2'/>
                <br />
                <p className = 'w-full'>Start by recalling the Bayes' filter</p>
                <BlockMath>{`
                        \\text{p}(x_t | z_{[0, t]}, u_{[0, t]}) \\propto \\text{p}(z_t | x_t)\\int_{\\text{all events}} p(x_t | x_{t - 1})p(x_{t - 1} | z_{[0, t-1]}, u_{[0, t - 1]})d(x_{t-1})
                    `}</BlockMath>
                <p className = 'w-full'>Like the Kalman filter, the particle filter starts by trying to figure out the right-hand side. However, instead of assuming that we can characterize the incoming distribution with 2 variables (like we did with our Gaussian assumption), we'll store the distribution via thousands of points, where points of increased density represent a higher probability(p.s, this field of statistical study is known as Monte Carlo statistics).</p>
                <br />
                <p className = 'w-full'>Like the Kalman filter, the next step involves pushing the distribution through our state transition function <InlineMath>{'f(x) = \\text{some operation}(x) + \\mu'}</InlineMath>. In the Kalman filter, we got simplified because of Gaussians. But with the particle filter, we simply just run every point through the raw function (including adding noise to the outputs ourselves!) and collect them in a new distribution <InlineMath>{'\\hat{p_{pred}}'}</InlineMath>. That completes the right hand side.</p>
                <br />
                <p className = 'w-full'>Next, of course, is the update step, where all our probabilities get multiplied by <InlineMath>{'p(z | x)'}</InlineMath>. In our particle filter, there's no defined way to calculate this. An example measure like <InlineMath>{'e^{-(z - h(x))}'}</InlineMath> could work, but there's no defined method.</p>
                <br />
                <p className = 'w-full'>Finally, because we're storing our distribution in a set, we need to resample the distribution so that it actually reflects the new probability densities that we calculated. A clever way to do this is to randomly select the particles such that the chance they get selected is proportional to their weight. In this way, heavier weighed particles get duplicated while lower-weight particles are dropped out, and the probability density is approximated. </p>
                <br />
                <p className = 'w-full'>By the law of large numbers, particle filtering is actually the most sure-fire way to approximate a difficult distribution, especially one that's very not-Gaussian. However, as you can probably tell, representing a difficult distribution accurately and pushing it through functions is way too computationally intensive for most purposes. In fact, the points you need grow exponentially with your input's dimensionality, which means that any input past 3 or 4 is pretty much infeasible.</p>
                <br />
                <p className = 'w-full'>As with all Bayes' filters, a particle filter needs to be initialized manually. A naive initalization would create a set of points with uniform distribution across the entire space, but it could take that type of filter a while to converge. Another idea is to start out with a Gaussian-like distribution with its mean at some initial guess. Regardless though, particle filters will take a while to do anything. </p>
                <br/>
                <p className = 'w-8/10 text-center'><i>Okay, we're done for real here :). I hope you enjoyed that little tangent!</i></p>
            </div>
        </InfoDropdown>
    </div>
}
export default AlgorithmsThree