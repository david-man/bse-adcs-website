import InfoDropdown from "../components/InfoDropdown"
import { InlineMath, BlockMath } from 'react-katex';
import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";
function AlgorithmsOne(){
    return (<div className = 'w-full h-full flex flex-col items-center gap-[5px]'>
        <h1 className = 'text-3xl w-full text-center m-5'>Algorithms: Part 1</h1>
            <InfoDropdown outerString = 'Problem Statement'>
                <div className = 'flex flex-col justify-items items-center'>
                    <p className = 'w-full'>Remember that, in ADCS, our goal is to get a rotation function between two frames A and B.</p>
                    <br/>
                    <p className = 'w-full'>As we said in the <Link to = '/rotations' className = 'text-blue-500'>rotations</Link> section, if you have a rotation function from A to B, you can use it to any vector V measured in Frame A to see what it would be if measured in Frame B.</p>
                    <br/>
                    <p className = 'w-full'>A corrolary to this is that, if you know how <b>2 non-collinear vectors</b> are expressed in <b>both</b> Frame A and Frame B (2 <i>vector pairs</i>), you can find the rotation function between A and B.</p>
                    <p className = 'w-8/10 text-center'>Remember, a vector A is collinear to a vector B if it can be written as the product of B and a scalar! We <i>don't like</i> that because the information encoded by having both A and B is the same as that encoded by just having one.</p>
                    <br/>
                    <p className = 'w-8/10 text-center'><i>Also, notice that we need 2 vectors. While not a mathematically rigorous reason, a good way to think about it is that, while a vector is only made up of 3 components, we need at least 4 <Link to = '/rotations' className = 'text-blue-500'>numbers</Link> to uniquely define a rotation. Intuitively, if we can't uniquely define a rotation with 4 numbers, there's no way that we could determine one uniquely with 3.</i></p>
                    <br/>
                    <p className = 'w-full'>This brings us to the problem statement, also known as Wahba's Problem, which is...</p>
                    <p className = 'w-8/10 text-center'><i>Given the vectors we know, what's the most likely rotation function between two frames?</i></p>
                    <p className = 'w-full'>Or, mathematically, what is the solution to...</p>
                    <BlockMath>{"\\text{min}_{q \\in SO(3)}\\frac{1}{2}\\sum_{k = 1}^{N}a_k||v_b^k - qv_a^kq^{-1}||^2"}</BlockMath>
                    <p className = 'w-full'>where <InlineMath>q</InlineMath> is a rotation quaternion from A to B, <InlineMath>{"a_i > 0, \\sum a_i = 1"}</InlineMath> are weight factors denoting how reliable each measurement is (0 is not reliable, 1 is perfectly reliable), <InlineMath>{"v_a^k \\in \\mathbb{R}"}</InlineMath> is the k-th vector expressed in Frame A, and <InlineMath>{"v_b^k \\in \\mathbb{R}"}</InlineMath> is that same vector expressed in Frame B.</p>
                </div>
            </InfoDropdown>
            <InfoDropdown outerString = 'TRIAD'>
                <div className = 'flex flex-col justify-items items-center'>
                    <p className = 'w-full'>Of all the algorithms we will discuss, the TRIAD algorithm is by far the oldest and simplest to solve Wahba's problem.</p>
                    <p className = 'w-full'>Its "trick" (and weakness) is to assume that, if  <InlineMath>q</InlineMath> is the correct rotation quaternion from A to B, then <InlineMath>{"\\forall v_a^k, v_b^k, v_b^k = qv_a^kq^{-1}"}</InlineMath>. In other words, it assumes noiseless data.</p>
                    <br/>
                    <hr className = 'w-full border-2'/>
                    <br />
                    <p className = 'w-8/10 text-center'><i>Warning: This section is linear algebra-heavy. If you need a refresher, I'd suggest checking out 3Blue1Brown's series <ExternalLink link = "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab">here</ExternalLink></i></p>
                    <p className = 'w-full'>To start, the TRIAD algorithm takes in <i>exactly</i> 2 vector pairs <InlineMath>(v_a^0, v_b^0), (v_a^1, v_b^1)</InlineMath>as inputs.</p>
                    <p className = 'w-full'>Then, it attempts to create an orthonormal basis for Frame A using <InlineMath>(v_a^0, v_a^1)</InlineMath> and an orthonormal basis for Frame B <InlineMath>(v_b^0, v_b^1)</InlineMath> using the Gram-Schmidt Algorithm...</p>
                    <ol className = 'w-9/10 list-decimal'>
                        <li>Start by normalizing <InlineMath>{"v_a^0 = \\frac{v_a^0}{||v_a^0||}"}</InlineMath> so that <InlineMath>{"||v_a^0|| = 1"}</InlineMath></li>
                        <li>Then, solve the set of equations <InlineMath>{"v_a^1 = cv_a^0 + c_1v_a^{0\\perp}, ||v_a^{0\\perp}|| = 1"}</InlineMath>, where <InlineMath>{"v_a^0 \\cdot v_a^{0\\perp} = 0"}</InlineMath>. This can be done using the projection formula <InlineMath>{"\\text{proj}_{v_a^0}v_a^1 = \\frac{v_a^1\\cdot v_a^0}{||v_a^0||^2}v_a^0 = cv_a^0"}</InlineMath></li>
                        <li>Now that you have 2 orthonormal vectors in 3D space, you should be able to solve for the third one by finding <InlineMath>{"v_a^2 = v_a^0 \\times v_a^{0\\perp}"}</InlineMath></li>
                        <li>Repeat this process to find the respective orthonormal basis for Frame B.</li>
                        <li>Note that, if you ever get that <InlineMath>{"v_a^{0\\perp} = \\mathbf{0}"}</InlineMath> or <InlineMath>{"v_b^{0\\perp} = \\mathbf{0}"}</InlineMath>, you must <b>STOP</b>. TRIAD (and in fact, every algorithm we talk about) will fail. This is because the vector pairs must be <i>non-collinear</i>. </li>
                    </ol>
                    <p className = 'w-full'>Let us create 3-by-3 matrices </p>
                    <BlockMath>
                        {`\\begin{align*}
                            A = \\begin{pmatrix}
                                | & | & | \\\\
                                v_a^0 & v_a^{0\\perp} & v_a^2\\\\
                                | & | & |
                            \\end{pmatrix}, B = \\begin{pmatrix}
                                | & | & | \\\\
                                v_b^0& v_b^{0\\perp}& v_b^2\\\\
                                | & | & | \\\\
                            \\end{pmatrix}
                        \\end{align*}`}
                    </BlockMath>
                    <p className = 'w-full'>An analysis of linear systems of equations gives us that our final rotation matrix from Frame A to Frame B can be written as <InlineMath>{"R_{a\\to b} = BA^T"}</InlineMath>. If you look hard enough, it turns out that this really is just a change of basis formula :)</p>
                    <p className = 'w-full'>Because 3D rotation matrices and quaternions are both part of the same <InlineMath>{"SO(3)"}</InlineMath> group, we can go from our rotation matrix to the final quaternion <ExternalLink link = "https://danceswithcode.net/engineeringnotes/quaternions/quaternions.html#:~:text=Convert%20Rotation%20Matrix%20to%20Quaternion&text=We%20can%20find%20the%20equivalent%20quaternion%20using%20two%20steps.&text=Step%202:%20To%20resolve%20the,in%20steps%201%20and%202.">answer</ExternalLink> with relative ease.</p>
                    <br/>
                    <hr className = 'border-2 w-full'/>
                    <br />
                    <p className = 'w-full'>While it might seem simple and straightforward, TRIAD suffers during times when measurements are noisy (a.k.a, always). In typical situations, people often try to just incorporate more measurements. Unfortunately, though, TRIAD <i>only can ever take 2</i> inputs. For that reason, it's fallen out of favor.</p>
                    </div>
            </InfoDropdown>
            <InfoDropdown outerString = 'QuEST'>
                <div className = 'flex flex-col justify-items items-center min-w-fit'>
                    <p className = 'w-full'>In the sphere of memory-less (dependent only on current inputs) spacecraft attitude determination algorithms, QuEST is the contemporary counterpart to TRIAD.</p>
                    <br/>
                    <hr className = 'w-full border-2'/>
                    <br />
                    <p className = 'w-8/10 text-center'><i>Warning: This section is <i>very</i> algebra-heavy. Don't sweat the details if you want to keep your sanity.</i></p>
                    <p className = 'w-full'>To start, the QuEST algorithm reframes Wahba's problem using a rotation matrix </p>
                    <BlockMath>{`\\text{min}_{A \\in SO(3)}\\frac{1}{2}\\sum_{k = 1}^{N}a_k||v_b^k - Av_a^k||^2 
                    =\\\\ 
                    \\text{min}_{A \\in SO(3)}\\frac{1}{2}\\sum_{k=1}^{N}a_k((v_b^k)^2 - 2((v_b^k)^TAv_a^k) + (Av_a^k)^2) `}</BlockMath>
                    <p className = 'w-8/10 text-center'>Using the fact that <InlineMath>{`
                    \\frac{\\partial(v_b^k)^2}{\\partial A} = \\frac{\\partial(v_a^k)^2}{\\partial A} = 0
                    `}</InlineMath>, we can further simplify this to</p>
                    <BlockMath>{`
                    \\text{min}_{A \\in SO(3)}\\sum_{k=1}^{N}a_k(-2((v_b^k)^TAv_a^k))
                    = \\\\
                    \\text{max}_{A \\in SO(3)}\\sum_{k=1}^{N}a_k(v_b^k)^TAv_a^k
                    `}</BlockMath>
                    <p className = 'w-full'>A neat trick you can do with equations like these is to consider using the trace function, which simply returns the sum of matrix diagonal. The trace function of a scalar is simply itself, but what's neat is that the trace function satisfies <ExternalLink link = "https://en.wikipedia.org/wiki/Trace_(linear_algebra)#Basic_properties">linearity, equality across transposition, and cyclical equality</ExternalLink>. Using these properties, this maximization problem can be restated as</p>
                    <BlockMath>{`
                        \\text{max}_{A \\in SO(3)}\\sum_{k = 1}^{N}a_k\\text{tr}((v_b^k)^TAv_a^k) 
                        \\\\
                        = \\text{max}_{A \\in SO(3)}\\text{tr}(\\sum_{k = 1}^{N}a_k(v_b^k)^TAv_a^k)
                        \\\\
                        = \\text{max}_{A \\in SO(3)}\\text{tr}(\\sum_{k = 1}^{N}a_kAv_a^k(v_b^k)^T)
                        \\\\
                        = \\text{max}_{A \\in SO(3)}\\text{tr}(A\\sum_{k = 1}^{N}a_kv_a^k(v_b^k)^T)
                    `}</BlockMath>
                    <p className = 'w-full'>This looks ugly, so let's just define a matrix <InlineMath>{'B^T = \\sum_{k = 1}^{N}a_kv_a^k(v_b^k)^T'}</InlineMath>. (Tangentially, it turns out that, if we say this, <InlineMath>B</InlineMath> is the attitude profile matrix.)</p>
                    <p className = 'w-full'>Now, our maximization problem becomes maximizing <InlineMath>{'\\text{max}_{A\\in SO(3)}\\text{tr}(AB^T)'}</InlineMath></p>
                    <br/>
                    <p className = 'w-full'>For having put all our faith into quaternions, we've spent an awful amount of time with rotation matrices. Well, now we're bringing quaternions back because the next step involves writing <InlineMath>AB^T</InlineMath> using a rotation (unit) quaternion <InlineMath>{'q = w + x\\hat{i} + y\\hat{j} + z\\hat{k}, ||q|| = q^T\\cdot q = 1'}</InlineMath>. More explicitly...</p>
                    <BlockMath>
                        {`
                        \\text{tr}(AB^T) = q^T\\mathbf{K}q
                        `}
                    </BlockMath>
                    <p className = 'w-8/10 text-center'>where K is the symmetric Davenport K Matrix defined by</p>
                    <BlockMath>
                        {`
                        K = \\begin{pmatrix}
                        | & | & | & |\\\\
                        | & B + B^T - \\text{tr}(B)\\mathbf{I^{3x3}} & | & \\mathbf{Z} \\\\
                        | & | & | & | \\\\
                        | & \\mathbf{Z^T} & | & \\text{tr}(B)
                        \\end{pmatrix}
                        \\\\
                        \\mathbf{Z} = \\begin{pmatrix}
                        B_{2, 3} - B_{3, 2}\\\\
                        B_{3, 1} - B_{1, 3}\\\\
                        B_{1, 2} - B_{2, 1}\\\\
                        \\end{pmatrix} = \\sum(a_i(v_b^i \\times v_a^i))
                        `}
                    </BlockMath>
                    <p className = 'w-8/10 text-center'><i>PLEASE do not feel like this has to make sense. The Davenport K Matrix derivation is extremely complex.</i></p>
                    <p className = 'w-full'>Now that we have a <i>constrained, quadratic-form</i> equation, we can use Lagrange Multipliers to help us out. More explicitly, we want to solve for when...</p>
                    <BlockMath>
                        {`\\frac{\\partial(q^T\\mathbf{K}q - \\lambda(q^Tq - 1))}{\\partial q} = 0 \\text{ and } \\frac{\\partial(q^T\\mathbf{K}q - \\lambda(q^Tq - 1))}{\\partial \\lambda} = 0`}
                    </BlockMath>
                    <p className = 'w-full'>Given that <InlineMath>{'\\forall \\lambda, \\frac{\\partial(q^T\\mathbf{K}q - \\lambda(q^Tq - 1))}{\\partial \\lambda} = 1 - q^Tq = 0 '}</InlineMath>, this problem simply becomes trying to solve for <InlineMath>{'2\\mathbf{K}q - 2\\lambda q = 0 \\to 2\\mathbf{K}q = 2\\lambda q'}</InlineMath>. From this, it's clear that we're basically just <i>solving for the eigenvalues of K</i> and trying to find the one whose corresponding unit quaternion maximizes <InlineMath>{'q^T\\mathbf{K}q = q^T\\lambda q'}</InlineMath>. </p>
                    <br/>
                    <p className = 'w-full'>Just looking at the above equation, it should be clear that our job is to find the maximum <InlineMath>{'\\lambda'}</InlineMath>, which we can do by solving for the <ExternalLink link = "https://en.wikipedia.org/wiki/Characteristic_polynomial">characteristic equation</ExternalLink> <InlineMath>{'\\text{det}(\\mathbf{K} - \\lambda \\mathbf{I^{3x3}}) = 0'}</InlineMath></p>
                    <br/>
                    <p className = 'w-full'>Tedious algebra can simplify the characteristic equation to be </p>
                    <BlockMath>{`f(\\lambda) = \\lambda^4 - (a+b)\\lambda^2 - c\\lambda + (ab - c\\sigma - d)
                    \\\\
                    \\sigma = \\frac{1}{2} * \\text{tr}(S)
                    \\\\
                    S = B + B^T
                    \\\\
                    a = \\sigma^2 - \\text{tr(adjugate}(S))
                    \\\\
                    b = \\sigma^2 + \\mathbf{Z}^T \\mathbf{Z}
                    \\\\
                    c = \\text{determinant}(S) + \\mathbf{Z}^T(S)\\mathbf{Z}
                    \\\\
                    d = \\mathbf{Z}^T(S)(S)\\mathbf{Z}
                    
                    `}</BlockMath>
                    <br/>
                    <p className = 'w-full'>To find <InlineMath>{'\\lambda'}</InlineMath> using this, we can use the Newton-Raphson method, which involves iteratively plugging into the equation <InlineMath>{`\\lambda_{t + 1} = \\lambda_{t} + \\frac{f(\\lambda)}{f'(\\lambda)}`}</InlineMath> with a starting value of <InlineMath>{'\\lambda = 1'}</InlineMath>. Expanded, this equation looks like...</p>
                    <BlockMath>
                        {`\\lambda_{t + 1} = \\lambda_{t} + \\frac{\\lambda^4 - (a+b)\\lambda^2 - c\\lambda + (ab - c\\sigma - d)}{4\\lambda^3 - 2(a+b)\\lambda - c}`}
                    </BlockMath>
                    <br/>
                    <p className = 'w-full'>Finally, once you iterate around 5 or so times, you can use the following equation to find the optimal quaternion</p>
                    <BlockMath>
                        {`
                        q = \\frac{1}{\\sqrt{\\gamma^2 + |X|^2}}\\begin{bmatrix}X \\\\ \\gamma \\end{bmatrix}\\\\
                        \\alpha = \\lambda^2 - \\sigma^2 + \\text{tr(adjugate}(S))
                        \\\\
                        \\beta = \\lambda - \\sigma
                        \\\\
                        \\gamma = (\\lambda + \\sigma)*\\alpha - \\text{determinant}(S)
                        \\\\
                        X = (\\alpha \\mathbf{I^{3x3}} + \\beta S + S\\cdot S)\\mathbf{Z}
                        `}
                    </BlockMath>
                    <br/>
                    <hr className = 'w-full border-2'/>
                    <br />
                    <p className = 'w-full'> In summary, QuEST is the modern day memoryless algorithm used for attitude estimation because, unlike TRIAD, in the face of noise, it can improve its estimation when there are more inputs.</p>
                    <br/>
                    <p className = 'w-full'> When considering time-per-iteration and RAM usage, its memoryless property makes it a strong algorithm. However, when time-per-iteration matters less and RAM is more abundant, it begins to fall short to other algorithms: most notably, the non-memoryless filters.</p>
                    <br/>
                    <p className = 'w-full'> In addition, it shouldn't be forgotten that QuEST <b>only performs better than TRIAD when there are more than 2 vector pairs</b>. This is because, when there are only 2 vector pairs, QuEST has no extra information to filter out noise with, and thus it and TRIAD will converge to the same result.</p>
                    <br/>
                    <p className = 'w-8/10'><i>Congratulations on getting through this section. I know it was probably not the easier thing, but hey, if you can get through this, you can get through anything. :)</i></p>
                </div>
            </InfoDropdown>
        </div>)
}
export default AlgorithmsOne