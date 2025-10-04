import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import InfoDropdown from '../components/InfoDropdown';
import ExternalLink from '../components/ExternalLink';

function Rotations(){
    return (<div className = 'w-full h-full flex flex-col items-center gap-[5px]'>
        <h1 className = 'text-3xl w-full text-center m-5'>Rotations</h1>
        <InfoDropdown outerString = "Basics">
            <div className = 'flex flex-col justify-center items-center'>
                <ul className = 'list-disc'>
                    <li>
                        <p className = 'w-full'>Frames: A frame in <InlineMath>{"\\mathbb{R}^3"}</InlineMath> is simply a system with an origin point that defines the frame's <InlineMath>(0,0,0)</InlineMath> and 3 orthogonal coordinate axes that define the frame's <InlineMath>{"(1,0,0), (0,1,0), (0,0,1)"}</InlineMath>. 
                        <br></br>
                        When we say that Frame A is "with respect to" Frame B, we are saying that we're going to measure Frame A's origin and 3 orthogonal axes using the units set by Frame B's origin and 3 orthogonal axis.</p>
                        <ul className = 'list-disc pl-[20px]'>
                            <li>Body Frame: This is your satellite's frame.</li>
                            <li>Reference Frame: This is the frame you are measuring your body frame with respect to. For most purposes, we use <ExternalLink link = "https://en.wikipedia.org/wiki/Earth-centered_inertial">Earth Centered Inertial</ExternalLink></li>
                        </ul>
                        <p className = 'w-full'>Likewise, when we say that we are measuring a vector V in Frame A, we are saying that we're going to measure V using Frame A's origin and 3 orthogonal axes.</p>
                    </li>
                    <li>
                        <p className = 'w-full'>(3-D) Rotation: Let Frame A have axes <InlineMath>{"F_x, F_y, F_z"}</InlineMath> defined with respect to Frame B. A function <InlineMath>{"T_{a, b}(\\cdot)"}</InlineMath> is considered a rotation from Frame A to Frame B if...</p>
                        <ul className = 'list-disc pl-[20px]'>
                            <li><InlineMath>{"T_{a, b}(F_x) \\cdot (1, 0, 0) = |F_x|"}</InlineMath></li>
                            <li><InlineMath>{"T_{a, b}(F_y) \\cdot (0, 1, 0) = |F_y|"}</InlineMath></li>
                            <li><InlineMath>{"T_{a, b}(F_z) \\cdot (0, 0, 1) = |F_z|"}</InlineMath></li>
                        </ul>
                        <p className = 'w-full'>In other words, if <InlineMath>{"T_{a,b}"}</InlineMath> makes each of Frame A's axes point in the same direction of Frame B's axes, <InlineMath>{"T_{a,b}"}</InlineMath> is a rotation from A to B.</p>
                        <br></br>
                        <p className = 'w-full'>It turns out that, if you can find a rotation function between Frame A and Frame B, you can apply it to any vector V measured in Frame A to see what it would be if measured in Frame B.</p>
                    </li>
                    
                </ul>
                <p className = 'w-8/10 text-center'><i>Rotations are so important that they've become a mathematical collection of things! 3D rotations that can commute (i.e, if <InlineMath>{'a(x), b(x)'}</InlineMath> are rotations, then <InlineMath>{'a(b(x))'}</InlineMath> combines them), in particular, are known as the <InlineMath>SO(3)</InlineMath> group.</i></p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Rotation Matrices">
            <div className = 'w-full flex flex-col'>
                <p className = 'w-full'>
                    In <InlineMath>{"\\mathbb{R}^3"}</InlineMath>, a rotation matrix from Frame A to Frame B is a 3-by-3 matrix that might look something like this...
                </p>
                <BlockMath>
                    {`R_{a, b}= \\begin{align*}
                        \\begin{bmatrix}
                            | & | & |\\\\
                            x_a & y_a & z_a\\\\
                            | & | & |\\\\
                        \\end{bmatrix}
                    \\end{align*}
                    `}
                </BlockMath>
                <p className = 'w-full'>
                    <InlineMath>{"R_{a,b}"}</InlineMath> can be used to rotate a vector <InlineMath>v_a</InlineMath> expressed in terms of Frame A to frame B via matrix multiplication.
                </p>
                <br/>
                <p className = 'w-full'>
                    In a rotation matrix that takes vectors expressed in terms of Frame A and outputs those vectors expressed in terms of Frame B, the columns are Frame A's coordinate axes expressed in terms of Frame B's coordinate units. You can watch 3Blue1Brown's video and playlist on it <ExternalLink link = "https://www.youtube.com/watch?v=P2LTAUO1TdA&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=13">here</ExternalLink>.
                </p>

                <br/>
                <p className = 'w-full'>
                    Rotation matrices are <i>well-defined</i>, meaning that they can uniquely represent the rotation between any two frames in their respective dimensions. Unfortunately, they take up 9 numbers, and we'll soon see that that's much more than is necessary. 
                </p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Euler Angles">
            <div className = 'flex flex-col justify-center items-center gap-2'>
                <p className = 'w-full'>
                    Euler angles are the standard "roll-pitch-yaw" that people think about, where a rotation is found by first applying a "roll" rotation around the x-axis, then applying a "pitch" rotation around the y-axis, and then applying a "yaw" rotation around the z-axis. 
                </p>
                <img src = "rollpitchyaw.gif" className = 'min-w-[200px] w-1/4'></img>
                <p className = 'w-full'>Note that the order matters! Applying "pitch" before "roll" will change your final rotation!</p>
                <br/>
                <br/>
                <p className = 'w-full'>
                    Euler angles, while much more compact than rotation matrices, are unfortunately <i>not</i> well-defined. This happens during gimbal lock, which is when two axes become aligned and rotating about one is the same as rotating about another. When this happens, an infinite combination of rotations can suddenly correspond to the same thing, violating a property of "well-defined" rotations. While this might not sound like a bad thing (after all, you can still get from every frame to every other frame), it can wreck havoc on control systems that rely on comparing rotations with each other. Thus, we can't rely on Euler angles.
                </p>
                <p className = 'w-full'>You can visualize gimbal lock <ExternalLink link = "https://compsci290-s2016.github.io/CoursePage/Materials/EulerAnglesViz/">here</ExternalLink> by setting "pitch" to 90 degrees and messing with the roll and yaw.</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Rotation Vectors">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>Another idea for defining rotations is by defining the rotation vector <InlineMath>{'r = [\\omega_x, \\omega_y, \\omega_z]'}</InlineMath>, which encodes a counterclockwise <InlineMath>{'|r| = \\sqrt{\\omega_x^2 + \\omega_y^2 + \\omega_z^2}'}</InlineMath> rotation around the axis <InlineMath>{'[\\frac{\\omega_x}{|r|}, \\frac{\\omega_y}{|r|}, \\frac{\\omega_z}{|r|}]'}</InlineMath> </p>
                <p className = 'w-full'>Unlike Euler angles, this rotation vector actually <i>doesn't</i> suffer from gimbal lock.</p>
                <p className ='w-full'>Unfortunately, this rotation vector parameterization of a rotation suffers from a lack of operability; in other words, it's extremely difficult do anything with them, like commuting or interpolating between them, without converting them to a different form. For that reason, they rarely appear in real-life ADCS systems.</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Quaternions">
            <div className = 'flex flex-col justify-items items-center'>
                <p className = 'w-full'>Quaternions are the modern-day standard for expressing rotations, and they are defined by 4 components: <InlineMath>{"q = <w, x, y, z>"}</InlineMath></p>
                <p className = 'w-full'>Unlike Euler angles, they're well-defined; in fact, it's been shown that the minimal amount of numbers you need to make a well-defined rotation in <InlineMath>{"\\mathbb{R}^3"}</InlineMath> is 4.</p>
                <br/>
                <p className = 'w-full'>Unfortunately, they're not nearly as simple as Euler angles or rotation matrices, so let's go through a way to think about them.</p>
                <br></br>
                <p className = 'w-full'>First, let's start by recalling that we can rotate any vector in the complex plane by <InlineMath>{"\\theta"}</InlineMath> if we multiply it on the right side by <InlineMath>{"e^{i\\theta}"}</InlineMath>.</p>
                <img src = "quaternion_1.png" className = 'h-[300px]'></img>
                <p className = 'text-center'><i>"A rotation in 2-D using method seems to be pretty solid, right? What if there was something like this in 3-D" - Sir William Quaternion or something</i></p>
                <br/>
                <p className = 'w-full'>And, with this thought, quaternions were created.</p>
                <hr className = 'border-2 w-full'/>
                <p className = 'w-full'>This next section is a more mathematically intensive (though very bearable) section. Skip ahead at your leisure.</p>
                <br/>
                <p className = 'w-full'>To make them act like complex numbers, a quaternion <InlineMath>{"q = <w, x, y, z>"}</InlineMath> is equivalent to <InlineMath>{"w + x\\hat{i} + y\\hat{j} + z\\hat{k}"}</InlineMath>, where <InlineMath>{"\\hat{i}, \\hat{j}, \\hat{k}"}</InlineMath> are supposed to resemble something like complex numbers in 3-D space.</p>
                <p className = 'w-8/10'><i>Note, of course, that they are not; after all, the complex field is unique up to isomorphism(basically, the only square roots of -1 are <InlineMath>{"i, -i"}</InlineMath>)</i></p>
                <p className = 'w-full'>To achieve this "complex-like" property, we'll make the following definitions...</p>
                <ol className = 'list-decimal w-9/10'>
                    <li><InlineMath>{"\\hat{i}\\hat{i} = \\hat{j}\\hat{j} = \\hat{k}\\hat{k} = -1"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{j}\\hat{k} = \\hat{i}"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{k}\\hat{j} = -\\hat{i}"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{i}\\hat{j} = \\hat{k}"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{j}\\hat{i} = -\\hat{k}"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{k}\\hat{i} = \\hat{j}"}</InlineMath></li>
                    <li><InlineMath>{"\\hat{i}\\hat{k} = -\\hat{j}"}</InlineMath></li>
                    <li><InlineMath>{"a\\hat{i} = \\hat{i}a, a\\hat{k} = \\hat{k}a, a\\hat{j} = \\hat{j}a"}</InlineMath> if <InlineMath>{"a \\in \\mathbb{R}"}</InlineMath></li>
                </ol>
                <p className ='w-full'>For the rigorous proof of why these rules allow quaternions to become rotations, see <ExternalLink link = "https://erkaman.github.io/posts/quaternion_rotation.html">Erik Arenback's website</ExternalLink></p>
                <br/>
                <p className = 'w-full'>For just some intuition, let's start by remembering that, in the complex plane, multiplication by <InlineMath>-i</InlineMath> on the right side would rotate a vector by 90 degrees clockwise without affecting its magnitude. Let's try to recreate that in a 3-D space using the multiplication properties listed above.</p>
                <br/>
                <p className = 'w-full'>Before anything else, let's consider a 3-D i-j-k field that looks something like this...</p>
                <img src = 'ijk.png' className = 'h-[300px]'></img>
                <br/>
                <p className = 'w-8/10 text-center'>Notice that we're missing a <InlineMath>{"\\mathbb{R}"}</InlineMath> component! This means that, for the sake of visualization, we'll just put every real number at (0,0).</p>
                <br/>
                <p className = 'w-full'>With our field, let's start off by seeing what happens when we transform the i-j-k field by multiplying everything <i>on the right side</i> by <InlineMath>{"\\hat{i}"}</InlineMath> </p>
                <img src = 'quat_rightmultiply_i.png' className = 'h-[300px]'></img>
                <br/>
                <p className = 'w-full'>Pretty neat, right? What about <InlineMath>{"-\\hat{i}"}</InlineMath>?</p>
                <img src = 'quaternion_rightmultiply_neg_i.png' className = 'h-[300px]'></img>
                <br/>
                <p className = 'w-full'>Now, what about multiplying everything <i>on the left side</i> by <InlineMath>{"\\hat{i}"}</InlineMath>?</p>
                <img src = 'quaternion_leftmultiply_i.png' className = 'h-[300px]'></img>
                <br/>
                <p className = 'w-full'>Now... woah, rewind.</p>
                <br/>
                <p className = 'w-full'>Notice anything about multiplying everything by <InlineMath>{"\\hat{i}"}</InlineMath> on the left and <InlineMath>{"-\\hat{i}"}</InlineMath> on the right? They're awfully similar <i>except for the fact that <InlineMath>{"\\hat{i}(-\\hat{i}) = 1"}</InlineMath> and <InlineMath>{"\\hat{i}*1 = \\hat{i}"}</InlineMath></i></p>
                <p className = 'w-full'>That means that these two operations are <i>inverses for all <InlineMath>{"\\hat{i}"}</InlineMath> components</i> and <i>symmetrical for all others</i>.</p>
                <p className = 'w-full'>Visually, it means that pairing the operations together gets us something like...</p>
                <img src = 'quaternion_double_multiply.png' className = 'h-[300px]'></img>
                <br />
                <p className = 'w-full'>In other words, we get a 180 degree clockwise turn around the i axis without changing any magnitudes!</p>
                <br/>
                <p className = 'w-full'>While this is great progress, we still haven't gotten our initial 90 degree clockwise rotation; we achieved double that. Intuitively, this suggests that, if we want to apply this double multiplication trick, we will have to make our rotation quaternion correspond to <i>half</i> the angle that we wanted.</p>
                <p className = 'w-full'>This leads to the following...</p>
                <br/>
                <hr className = 'border-2 w-full'/>
                <br/>
                <p className = 'w-full'>Using the intuition we gained above (or the intuition to skip down here and avoid the math), we arrive at the following definitions:</p>
                <br/>
                <p className = 'w-full'>If we define a rotation quaternion</p>
                <p className = 'w-full text-center'><InlineMath>{"q_w = \\text{cos}(\\frac{\\theta}{2}), [q_x, q_y, q_z] = \\text{sin}(\\frac{\\theta}{2})\\mathbf{u}, |q| = 1"}</InlineMath></p>
                <p className = 'w-full text-center'>where <InlineMath>{"\\mathbf{u} = (u_x, u_y, u_z)"}</InlineMath> is the vector-defined axis that we are rotating about</p>
                <p className = 'w-full'>and we define a <i>pure quaternion</i> <InlineMath>{"\\mathbf{v} = (v_x, v_y , v_z) = 0 + v_x\\hat{i} + v_y\\hat{j} + v_z\\hat{k}, |v| \\in \\mathbb{R}"}</InlineMath></p>
                <p className = 'w-full'>Then, by applying the formula</p>
                <p className = 'w-full text-center'><InlineMath>{"q\\mathbf{v}q^{-1}"}</InlineMath></p>
                <p className = 'w-full'>we can rotate <InlineMath>{"\\mathbf{v} \\text{ by } \\theta"}</InlineMath> radians/degrees counterclockwise!</p>
                <br/>
                <hr className = 'border-2 w-full'/>
                <br />
                <p className = 'w-full'>In addition to explicit quaternion rotations, there are a few properties of rotation quaternions that we should note.</p>
                <br />
                <ul className = 'list-disc width-9/10'>
                    <li>While you could multiply out all the imaginary numbers every time, quaternions are so often used that there is an explicit multiplication shortcut given by the <ExternalLink link = 'https://en.wikipedia.org/wiki/Quaternion#Hamilton_product'>Hamilton Product</ExternalLink> that will instantly get you the resultant quaternion.</li>
                    <li>Quaternion multiplication is non-commutative: in other words, <InlineMath>{'qp \\neq pq'}</InlineMath></li>
                    <li>Quaternion multiplication is associative: in other words, <InlineMath>{'q(mn) == (qm)n'}</InlineMath></li>
                    <li>Quaternion multiplication is distributive: in other words, <InlineMath>{'q(m + n) == qm + qn'}</InlineMath></li>
                    <li>Quaternions are non-additive: in other words, you cannot express a combined rotation as <InlineMath>{'q + p'}</InlineMath></li>
                    <li>The quaternion that reverses the rotation caused by a quaternion <InlineMath>{'q = [w,x,y,z]'}</InlineMath> is <InlineMath>{'q^{-1} = [w, -x, -y, -z]'}</InlineMath></li>
                    <li>Quaternions do not have a closed form integral. Thus, one must discretize its integration. This is most often done through an first order Euler approximation, with the rotational derivative given by angular velocities defined by a rotation vector. 
                        <br/>
                        <br/>
                        Explicitly, if quaternions are considered as simply 4-component vectors, 
                        <BlockMath>{`\\frac{dq}{dt} = \\frac{1}{2}\\Omega q, \\Omega = 
                        \\begin{pmatrix} 
                        0 & -\\omega_x &-\\omega_y & -\\omega_z 
                        \\\\
                        \\omega_x & 0 &\\omega_z & -\\omega_y
                        \\\\
                        \\omega_y & -\\omega_z &0 & \\omega_x
                        \\\\
                        \\omega_z & \\omega_y &-\\omega_x & 0
                        \\end{pmatrix}
                        \\\\
                        q_{t + 1} = \\text{normalize}(q + \\Delta t \\frac{dq}{dt})`}</BlockMath>
                        We'll prove this below.
                    </li>
                </ul>
                <br/>
                <hr className = 'w-full border-2'></hr>
                <br/>
                <p className = 'w-full'>To show the translation between angular rate and quaternions, let's start by reconsidering the equation.</p>
                <BlockMath>{"q = \\text{cos}(\\frac{\\theta}{2}) + \\text{sin}(\\frac{\\theta}{2})\\mathbf{u}, |q| = 1"}</BlockMath>
                <p className = 'w-full'>For a rotational change <InlineMath>{'\\Delta q'}</InlineMath>, start by defining an equivalent rotation vector defined by an angular velocity <InlineMath>{'\\omega'}</InlineMath>, where the rotational quantity is  <InlineMath>{'|\\omega|\\Delta t'}</InlineMath> and the axis of rotation is <InlineMath>{'u = \\frac{\\omega}{|\\omega|}'}</InlineMath>. Then, we have </p>
                <BlockMath>{"\\Delta q_w = \\text{cos}(\\frac{|\\omega|\\Delta t}{2}), [\\Delta q_x, \\Delta q_y, \\Delta q_z] = \\text{sin}(\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega}{|\\omega|}"}</BlockMath>
                <p className = 'w-full'>Now, let's approximate <InlineMath>{'q_{t + \\Delta} = \\Delta q * q'}</InlineMath>, and let's recall the limit definition of the derivative <InlineMath>{'\\frac{df}{dx} = \\lim_{h \\to 0}\\frac{f(x + h) - f(x)}{h}'}</InlineMath>. It follows that the derivative of a quaternion would be </p>
                <BlockMath>{`
                \\frac{dq}{dt} = \\lim_{\\Delta t \\to 0}\\frac{q_{t + \\Delta t} - q}{\\Delta t} = \\\\
                \\lim_{\\Delta t \\to 0}\\frac{\\Delta t * q - q}{\\Delta t} = \\\\
                \\lim_{\\Delta t \\to 0}\\frac{(\\Delta t - \\mathbf{1})q}{\\Delta t} = \\\\
                \\lim_{\\Delta t \\to 0}\\frac{([\\text{cos}(\\frac{|\\omega|\\Delta t}{2}), \\text{sin}(\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_x}{|\\omega|}, \\text{sin}(\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_y}{|\\omega|}, \\text{sin}(\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_z}{|\\omega|}] - \\mathbf{1})q}{\\Delta t} = \\\\
                \\text{Considering the known limits of cosine and sine as they approach zero...} \\\\
                \\lim_{\\Delta t \\to 0}\\frac{([1, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_x}{|\\omega|}, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_y}{|\\omega|}, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_z}{|\\omega|}] - [1, 0, 0, 0])q}{\\Delta t} = \\\\
                \\lim_{\\Delta t \\to 0}\\frac{([0, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_x}{|\\omega|}, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_y}{|\\omega|}, (\\frac{|\\omega|\\Delta t}{2})\\frac{\\omega_z}{|\\omega|}])q}{\\Delta t} = \\\\
                \\lim_{\\Delta t \\to 0}([0, (\\frac{|\\omega|}{2})\\frac{\\omega_x}{|\\omega|}, (\\frac{|\\omega|}{2})\\frac{\\omega_y}{|\\omega|}, (\\frac{|\\omega|}{2})\\frac{\\omega_z}{|\\omega|}])q = \\\\
                [0, \\frac{\\omega_x}{2}, \\frac{\\omega_y}{2}, \\frac{\\omega_z}{2}]q = \\\\
                \\frac{1}{2} \\omega_{pure} q
                `}</BlockMath>
                <p className = 'w-full'>Here, <InlineMath>{'\\omega_{pure}'}</InlineMath> is known as the pure quaternion form of the angular velocity. By plugging in these numbers into the Hamilton product to multiply the quaternions together and then normalizing everything, we can find that the derivative of the quaternion will be the same as described above.</p>
                <br />
                <hr className = 'border-2 w-full'></hr>
                <br />
                <p className = 'w-full'>Congratulations on finishing this section! While I know all the information might feel fuzzy right now, I know you're smart enough to piece through it all :). Take a break if you have to, and if you have any questions, feel free to send me an email through the help menu or message me directly.</p>
            </div>
        </InfoDropdown>
    </div>)
}

export default Rotations