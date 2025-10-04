import InfoDropdown from "../components/InfoDropdown"
import { InlineMath, BlockMath } from 'react-katex';
import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";
function AlgorithmsTwo(){
    return <div className = 'w-full h-full flex flex-col items-center gap-[5px]'>
        <h1 className = 'text-3xl w-full text-center m-5'>Algorithms: Part 2</h1>
        <InfoDropdown outerString="Context">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>In almost all modern applications of cubesats, ADCS algorithms are given access to gyroscopes, accelerometers, and magnetometers. With these three measurement tools so commonly used, a variety of algorithms (filters) have been designed specifically to exploit their characteristics for attitude determination.</p>
                <p className = 'w-full'></p>
                <p className = 'w-full'>Of course, the PVDx mission won't be using any of these (since we don't have the requisite materials), but it's still good to know for a wider understanding about ADCS systems in today's world.</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = 'Complementary Filter'>
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>The complementary filter is one of the simplest ways to fuse data from gyroscopes, accelerometers, and magnetometers. The word "complementary" describes how it tries to negate the errors from one sensor by using other sensors. More specifically, it tries to complement the stable but biased signal from the gyroscope with the high-frequency noisy signals from the magnetometers and accelerometers. Its goal is to find the roll, pitch, and yaw rotation that rotates a vector in the body frame to Earth's North-East-Down frame (North = +x, East = +y, Up = +z).</p>
                <p className = 'w-8/10 text-center'><i>Note that the North-East-Down frame itself changes as you move around Earth! This is a critical limitation of the complementary filter and the filters to come.</i></p>
                <br/>
                <hr className = 'w-full border-2'/>
                <br />
                <p className = 'w-full'>To start, the complementary filter takes in an accelerometer reading <InlineMath>{'\\mathbf{a} = \\{a_x, a_y, a_z\\}, |\\mathbf{a}| = 1'}</InlineMath>. Then, assuming that the only acceleration being applied to the satellite is the force of gravity pointing downward, the accelerometer derives the roll and pitch using the following equations:</p>
                <BlockMath>
                    {`\\begin{gather*}
                            \\text{roll} = \\theta_x = \\text{arctan2}(a_y, a_x) \\\\
                            \\text{pitch} = \\theta_y = \\text{arctan2}(-a_x, \\sqrt{a_y^2 + a_x^2}) \\\\
                            \\text{yaw} = \\theta_z = \\text{unknown, so we assume 0}
                        \\end{gather*}`}
                </BlockMath>
                <p className = 'w-full'>Notice how we can't fully determine our rotation with just the accelerometer, as the yaw could realistically be anything. To understand why, it might be good to look at the following picture. What would happen if I tried to put an accelerometer at the yellow dot and yaw'd the airplane around? Would I get any different readings?</p>
                <img src = 'roll_pitch_yaw.svg' className = 'w-1/2'></img>
                <br/>
                <br/>
                <p className = 'w-full'>Of course, if a magnetometer measurement <InlineMath>{'\\mathbf{m} = \\{m_x, m_y, m_z\\}, |\\mathbf{m}| = 1'}</InlineMath> is available, we can then compute the entire rotation.</p>
                <br/>
                <p className = 'w-full'>Now, if our satellite was sitting perfectly above Earth with no roll or pitch, we could simply calculate our yaw by calculating <InlineMath>{'\\text{arctan2}(-m_y, m_x)'}</InlineMath>. Of course, this type of situation is not guaranteed, but the concept is there.</p>
                <p className = 'w-full'>More specifically, we'd like to <i>complement</i> our magnetometer readings with the roll and pitch we've received from the accelerometer, which would rotate <InlineMath>{'\\mathbf{m} = \\{m_x, m_y, m_z\\} \\to \\mathbf{m\'} = \\{m\'_x, m\'_y, m\'_z\\}'}</InlineMath>. It's important to recognize that applying this rotation would <i>emulate</i> us <i>rotating our satellite so that it was sitting above Earth with no roll or pitch</i>, which would mean that we can just calculate the yaw with <InlineMath>{'\\text{arctan2}(-m_\'y, m_\'x)'}!</InlineMath></p>
                 <br/>
                <p className = 'w-full'>Mathematically, to apply just the roll and pitch, we convert <InlineMath>{'\\theta_x, \\theta_y'}</InlineMath> to the <ExternalLink link = 'https://en.wikipedia.org/wiki/Rotation_matrix'>rotation matrices</ExternalLink> </p>
                <BlockMath>{`\\mathbf{R_x} = 
                \\begin{pmatrix}
                    1 & 0 & 0 \\\\
                    0 & \\cos{\\theta_x} & -\\sin{\\theta_x} \\\\
                    0 & \\sin{\\theta_x} & \\cos{\\theta_x}
                \\end{pmatrix}, 
                \\mathbf{R_y} = 
                \\begin{pmatrix}
                    \\cos{\\theta_y} & 0 & \\sin{\\theta_y} \\\\
                    0 & 1 &  0\\\\
                    -\\sin{\\theta_y} & 0 & \\cos{\\theta_y}
                \\end{pmatrix}`}</BlockMath> 
                <p className = 'w-full'>and apply them in to the magnetometer vector such that <InlineMath>{'m\' = \\mathbf{R_y}\\mathbf{R_x}m'}</InlineMath>. This gets us the equations...</p>
                <BlockMath>
                    {`\\begin{gather*}
                        m\'_x = m_x\\cos{\\theta_x}+m_y\\sin{\\theta_x}\\sin{\\theta_y}\\\\
                        m\'_y = m_y\\cos{\\theta_y}-m_z\\sin{\\theta_y}
                    \\end{gather*}
                    `}
                </BlockMath>
                <p className = 'w-full'> which ultimately allows us to derive that <InlineMath>{'\\text{yaw} = \\theta_z = \\text{arctan2}(-m\'_y, m\'_x)'}</InlineMath>. Notationally, we can now package our roll, pitch, and yaw into a single vector <InlineMath>{'\\mathbf{\\theta_{am}}'}</InlineMath></p>
                <br/>
                <p className = 'w-full'>At the end of all these Euler angle calculations, we can merge these estimations with the gyroscope measurements.</p>
                <p className = 'w-8/10 text-center'><i>Gyroscopes, of course, measure the derivatives of the Euler angles (the angular velocities), so to get a gyroscope estimate <InlineMath>{'\\mathbf{\\theta_g}'}</InlineMath>, we simply integrate.</i></p>
                <p className = 'w-full'>Mathematically, this is done using a hyperparameter <InlineMath>{'\\alpha \\in [0, 1]'}</InlineMath>, where <InlineMath>{'\\mathbf{\\theta_{pred}} = \\alpha * \\mathbf{\\theta_g} + (1-a)*\\mathbf{\\theta_{am}}'}</InlineMath></p>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-full'>While not the most sophisticated, the complementary filter is still widely used in many situations. This is because, by being so compact, it has the ability to run at extremely fast rates, which allows it to sift through more data and, with some external processing, provide more stable estimates than other filters.</p>

            </div>
        </InfoDropdown>
        <InfoDropdown outerString = 'Mahony Filter'>
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>The Mahony Filter builds off the complementary filter by making it <i>quaternion based</i> and by adding a Proportional-Integral compensator to minimize the gyroscope bias. </p>
                <p className = 'w-full'>The mathematical breakdown of the algorithm is often expressed as the Explicit Complementary Filter.</p>
                <br/>
                <hr className = 'w-full border-2' />
                <br/>
                <p className = 'w-full'><i>This section uses some information from the <Link to = {'/rotations'} className = 'underline text-blue-500'>quaternions</Link> section. Feel free to brush up on it if necessary.</i></p>
                <br/>
                <p className = 'w-full'>Recall that the cross product of two vectors <InlineMath>{'v_1 \\times v_2'}</InlineMath>will produce a vector that is orthogonal to them. In 3D space, it turns out that this vector will actually be the <i>axis of rotation</i> that you need to turn around to get from <InlineMath>{'v_1 \\to v_2'}</InlineMath>, and that the magnitude of this cross product will be proportional to the size of the angle between them. We can use this fact to find so-called error terms.</p>
                <br />
                <p className = 'w-full'>Let's now define our normalized accelerometer reading <InlineMath>{'a = [a_x, a_y, a_z]'}</InlineMath>. If our current quaternion estimate  <InlineMath>{'q'}</InlineMath> is a quaternion transformation from body to world frame, then we can get expected readings by transforming the normalized gravity vector, <InlineMath>[0,0,1]</InlineMath> from the North-East-Down world frame to the body frame via <InlineMath>{'\\hat{a} = \\text{to3DVector}(q^{-1}*[0,0,0,1]*q)'}</InlineMath>. Define the error term <InlineMath>{'e_a = a \\times \\hat{a}'}</InlineMath>.</p>
                <br />
                <p className = 'w-full'>Next, let's define our normalized magnetometer reading <InlineMath>{'m = [m_x, m_y, m_z]'}</InlineMath>. Like last time, we can get expected readings by transforming the local normalized magnetometer vector, <InlineMath>{'m_{local}'}</InlineMath> from the North-East-Down world frame to the body frame via <InlineMath>{'\\hat{m} = \\text{to3DVector}(q^{-1}*m_{local}*q)'}</InlineMath>. Alternatively, by assuming that <InlineMath>{'m_{local}'}</InlineMath> has a negligble east (y) component, we can assume <InlineMath>{'m_{local} = [\\sqrt{h_x^2 + h_y^2}, 0, h_z]'}</InlineMath>, where <InlineMath>{'h = \\text{to3DVector}(q*m*q^{-1})'}</InlineMath>. Either way, define the error term <InlineMath>{'e_m = m \\times \\hat{m}'}</InlineMath>.</p>
                <br />
                <p className = 'w-full'>Let's define a total error term as <InlineMath>{'e = k_m * e_m + k_a * e_a'}</InlineMath>, where <InlineMath>{'k_a, k_m \\geq 0'}</InlineMath> are the <i>proportion</i> hyperparameter that tell us how much to weigh each error.</p>
                <p className = 'w-full'>Let's now consider that our gyroscope reading can be modeled by the equation </p>
                <BlockMath>{`\\begin{gather*} \\Omega = \\Omega_{true} + b + \\eta, b = \\text{bias}, \\eta = \\text{Gaussian Error} \\end{gather*}`}</BlockMath>
                <p className = 'w-full'>Assuming that the gyroscope is initially unbiased and slowly drifts over time, we will try to estimate this bias term by setting it initially to zero and using an <i>integrator</i> control system defined by <InlineMath>{'\\Delta b = -k_I * e'}</InlineMath>, where <InlineMath>{'k_I \\geq 0'}</InlineMath> is some hyperparameter.</p>
                <p className = 'w-full'>Now, we can get our estimated true angular velocity via <InlineMath>{'\\Omega_{true} \\approx \\Omega - b + e'}</InlineMath>. Using the equation <InlineMath>{'\\frac{dq}{dt} = \\frac{1}{2}\\omega q'}</InlineMath>, we can then get our predicted quaternion for the current time as <InlineMath>{'q_{pred} = \\text{normalize}(q_{t - 1} + \\Delta t * \\frac{1}{2}(\\Omega - b + e) q_{t - 1})'}</InlineMath></p>
                <br/>
                <p className = 'w-full'><b>DANGER</b> : A keen eye would have you notice that this filter never explicitly determines a <InlineMath>{'q'}</InlineMath>; rather, it simply keeps integrating over time. These systems require you as the developer to give an initial estimate, and while most algorithms are proven to eventually converge even under suboptimal estimates, the time to convergence may substantially increase with a bad guess.</p>
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-full'>Because of its speed and ease-of-use, the Mahony filter is one of the most common filters used today!</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = 'Madgwick Filter'>
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>The Madgwick filter is another popular filter that diverges from the other two filters in that it uses <ExternalLink link = "https://en.wikipedia.org/wiki/Gradient_descent">gradient descent</ExternalLink> to update its estimates.</p>
                <br/>
                <hr className = 'w-full border-2' />
                <br/>
                <p className = 'w-full'><i>This section uses some information from the <Link to = {'/rotations'} className = 'underline text-blue-500'>quaternions</Link> section. Feel free to brush up on it if necessary.</i></p>
                <br/>
                <p className = 'w-full'>Like the Mahony filter, we'll start by considering our normalized accelerometer reading <InlineMath>{'a_{pure}= [0, a_x, a_y, a_z]'}</InlineMath>. If our current quaternion estimate  <InlineMath>{'q'}</InlineMath> is a quaternion transformation from body to world frame, then we can get expected readings by transforming the normalized gravity vector, <InlineMath>[0,0,1]</InlineMath> from the North-East-Down world frame to the body frame via <InlineMath>{'\\hat{a}(q) = q^{-1}*[0,0,0,1]*q'}</InlineMath>. Define the acceleration error term <InlineMath>{'e_a(q) = \\hat{a}(q) - a_{pure}'}</InlineMath>.</p>
                <p className = 'w-full'>If we're to use a method like gradient descent, it's pretty easy to see that our goal is to minimize <InlineMath>{'e_a(q)'}</InlineMath>. By the concept of gradient descent, we can do this by finding the gradient <InlineMath>{'\\nabla e_a(q)'}</InlineMath> and adjusting our measurement by <InlineMath>{'-\\alpha \\nabla e_a(q)'}</InlineMath>, where <InlineMath>{'-\\alpha'}</InlineMath> is some learning rate hyperparamter. For the accelerometer, a closed form gradient given by a <ExternalLink link = "https://en.wikipedia.org/wiki/Jacobian_matrix_and_determinant">Jacobian (vector derivative)</ExternalLink> exists, whereby</p>
                <BlockMath>
                    {`\\begin{gather*}
                    \\nabla e_a(q) = J_a^T(q) * e_a(q), \\\\
                    J_a(q) = \\frac{d(e_a)}{d q} = 2\\begin{pmatrix}
                        -q_y & q_z & -q_w & q_x \\\\
                        q_x & q_w & q_z & q_y \\\\
                        0 & -2q_x & -2q_y & 0
                    \\end{pmatrix}
                    \\end{gather*}`}
                </BlockMath>
                <p className = 'w-full'>While we could do the same for the normalized magnetometer measurement <InlineMath>{'m_measured'}</InlineMath>, an easier way to go about things (without needing the explicit solution for the magnetic field) is to assume that <InlineMath>{'m_y = m_{east} = 0'}</InlineMath>, which allows us to turn <InlineMath>{'m_{true} \\to [\\sqrt{h_x^2 + h_y^2}, 0, h_z]'}</InlineMath>, where <InlineMath>{'h = \\text{to3DVector}(q * m_{measured} * q^{-1})'}</InlineMath>. Using this approach, it follows that our gradient <InlineMath>{'\\nabla e_m'}</InlineMath> is equal to </p>
                <BlockMath>
                    {`\\begin{gather*}
                    \\nabla e_m(q) = J_m^T(q) * e_m(q), \\\\
                    J_m(q) = \\begin{pmatrix}
                        -2m_zq_y          & 2m_zq_z         & -4m_xq_y-2m_zq_w & -4m_xq_z+2m_zq_x \\\\
                        -2m_xq_z+2m_zq_x  & 2m_xq_y+2m_zq_w & 2m_xq_x+2m_zq_z  & -2m_xq_w+2m_zq_y \\\\
                        2m_xq_y           & 2m_xq_z-4m_zq_x & 2m_xq_w-4m_zq_y  & 2m_xq_x
                        \\end{pmatrix}
                    \\end{gather*}`}
                </BlockMath>
                <p className = 'w-full'>With gradients calculated, we can get a change quaternion that contains the changes we believe need to be made based on the gradients, as well as our gyroscope measurements. Specifically, <InlineMath>{'dq = \\frac{1}{2}\\Omega q - \\alpha(\\nabla e_a + \\nabla e_m)'}</InlineMath>, whereby <InlineMath>{'\\Omega'}</InlineMath> are our gyroscope measurements and <InlineMath>{'q_t = \\text{normalize}(q_{t - 1} + dq * \\Delta t)'}</InlineMath></p>
                <br/>
                <p className = 'w-full'><b>DANGER</b> : Like with the Mahony algorithm, this filter never explicitly determines a <InlineMath>{'q'}</InlineMath>; rather, it simply keeps integrating over time. These systems require you as the developer to give an initial estimate, and while most algorithms are proven to eventually converge even under suboptimal estimates, the time to convergence may substantially increase with a bad guess.</p>
                <br/>
                <p className = 'w-full'>While more computationally complex, the Madgewick filter is considered more stable in high-noise situations and better when data intake is slower. Thus, it's also a great filter that's commonly used today.</p>
                <br/>
                <p className = 'w-full'>In addition, while initially designed by Madgewick for a magnetometer, gyroscope, and accelerometer system, the Madgewick filter can be extended to any system. Specifically, given a reference vector <InlineMath>{'d'}</InlineMath> and that same vector in the body frame <InlineMath>{'s'}</InlineMath>, you can calculate <InlineMath>{'\\nabla e(q)'}</InlineMath> using the general formula </p>
                <BlockMath>
                    {`\\nabla e(q) = J(q)^T e(q), \\\\
                    J(q) = \\begin{pmatrix}
                        2d_x(\\frac{1}{2}-q_y^2-q_z^2) + 2d_y(q_wq_z+q_xq_y) + 2d_z(q_xq_z-q_wq_y) - s_x \\\\
                        2d_x(q_xq_y-q_wq_z) + 2d_y(\\frac{1}{2}-q_x^2-q_z^2) + 2d_z(q_wq_x+q_yq_z) - s_y \\\\
                        2d_x(q_wq_y+q_xq_z) + 2d_y(q_yq_z-q_wq_x) + 2d_z(\\frac{1}{2}-q_x^2-q_y^2) - s_z
                        \\end{pmatrix}`}
                </BlockMath>
                <br/>
                    <p className = 'w-8/10'><i>Congratulations on getting through this section! I hope you're getting the hang of things now, and that you're beginning to see why ADCS is so cool :)! Again, take a break if you have to, and if you have any questions, feel free to send me an email through the help menu or message me directly.</i></p>
                
            </div>
        </InfoDropdown>
    </div>
}
export default AlgorithmsTwo