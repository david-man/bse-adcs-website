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
                        <p>Frames: A frame in <InlineMath>{"\\mathbb{R}^3"}</InlineMath> is simply a system with an origin point that defines the frame's <InlineMath>(0,0,0)</InlineMath> and 3 orthogonal coordinate axes that define the frame's <InlineMath>{"(1,0,0), (0,1,0), (0,0,1)"}</InlineMath>. 
                        <br></br>
                        When we say that Frame A is "with respect to" Frame B, we are saying that we're going to measure Frame A's origin and 3 orthogonal axes using the units set by Frame B's origin and 3 orthogonal axis.</p>
                        <ul className = 'list-disc pl-[20px]'>
                            <li>Body Frame: This is your satellite's frame.</li>
                            <li>Reference Frame: This is the frame you are measuring your body frame with respect to. For most purposes, we use <ExternalLink link = "https://en.wikipedia.org/wiki/Earth-centered_inertial">Earth Centered Inertial</ExternalLink></li>
                        </ul>
                        <p>Likewise, when we say that we are measuring a vector V in Frame A, we are saying that we're going to measure V using Frame A's origin and 3 orthogonal axes.</p>
                    </li>
                    <li>
                        <p>(3-D) Rotation: Let Frame A have axes <InlineMath>{"F_x, F_y, F_z"}</InlineMath> defined with respect to Frame B. A function <InlineMath>{"T_{a, b}(\\cdot)"}</InlineMath> is considered a rotation from Frame A to Frame B if...</p>
                        <ul className = 'list-disc pl-[20px]'>
                            <li><InlineMath>{"T_{a, b}(F_x) \\cdot (1, 0, 0) = |F_x|"}</InlineMath></li>
                            <li><InlineMath>{"T_{a, b}(F_y) \\cdot (0, 1, 0) = |F_y|"}</InlineMath></li>
                            <li><InlineMath>{"T_{a, b}(F_z) \\cdot (0, 0, 1) = |F_z|"}</InlineMath></li>
                        </ul>
                        <p>In other words, if <InlineMath>{"T_{a,b}"}</InlineMath> makes each of Frame A's axes point in the same direction of Frame B's axes, <InlineMath>{"T_{a,b}"}</InlineMath> is a rotation from A to B.</p>
                        <br></br>
                        <p>It turns out that, if you can find a rotation function between Frame A and Frame B, you can apply it to any vector V measured in Frame A to see what it would be if measured in Frame B.</p>
                    </li>
                    
                </ul>
                <p className = 'w-8/10 text-center'><i>Rotations are so important that they've become a mathematical collection of things! 3D rotations, in particular, are known as the <InlineMath>SO(3)</InlineMath> group.</i></p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Rotation Matrices">
            <div className = 'w-full flex flex-col'>
                <p>
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
                <p>
                    <InlineMath>{"R_{a,b}"}</InlineMath> can be used to rotate a vector <InlineMath>v_a</InlineMath> expressed in terms of Frame A to frame B via matrix multiplication.
                </p>
                <br/>
                <p>
                    In a rotation matrix that takes vectors expressed in terms of Frame A and outputs those vectors expressed in terms of Frame B, the columns are Frame A's coordinate axes expressed in terms of Frame B's coordinate units. You can watch 3Blue1Brown's video and playlist on it <ExternalLink link = "https://www.youtube.com/watch?v=P2LTAUO1TdA&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=13">here</ExternalLink>.
                </p>

                <br/>
                <p>
                    Rotation matrices are <i>well-defined</i>, meaning that they can uniquely represent the rotation between any two frames in their respective dimensions. Unfortunately, they take up 9 numbers, and we'll soon see that that's much more than is necessary. 
                </p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Euler Angles">
            <div className = 'flex flex-col justify-center items-center gap-2'>
                <p>
                    Euler angles are the standard "roll-pitch-yaw" that people think about, where a rotation is found by first applying a "roll" rotation around the x-axis, then applying a "pitch" rotation around the y-axis, and then applying a "yaw" rotation around the z-axis. 
                </p>
                <img src = "rollpitchyaw.gif" className = 'min-w-[200px] w-1/4'></img>
                <p>Note that the order matters! Applying "pitch" before "roll" will change your final rotation!</p>
                <br/>
                <br/>
                <p>
                    Euler angles, while much more compact than rotation matrices, are unfortunately <i>not</i> well-defined. This happens during gimbal lock, which is when two axes become aligned and rotating about one is the same as rotating about another. When this happens, an infinite combination of rotations can suddenly correspond to the same thing, violating a property of "well-defined" rotations. While this might not sound like a bad thing (after all, you can still get from every frame to every other frame), it can wreck havoc on control systems that rely on comparing rotations with each other. Thus, we can't rely on Euler angles.
                </p>
                <p>You can visualize gimbal lock <ExternalLink link = "https://compsci290-s2016.github.io/CoursePage/Materials/EulerAnglesViz/">here</ExternalLink> by setting "pitch" to 90 degrees and messing with the roll and yaw.</p>
            </div>
        </InfoDropdown>
        <InfoDropdown outerString = "Quaternions">
            <div className = 'flex flex-col justify-items items-center'>
                <p>Quaternions are the modern-day standard for expressing rotations, and they are defined by 4 components: <InlineMath>{"q = <w, x, y, z>"}</InlineMath></p>
                <p>Unlike Euler angles, they're well-defined; in fact, it's been shown that the minimal amount of numbers you need to make a well-defined rotation in <InlineMath>{"\\mathbb{R}^3"}</InlineMath> is 4.</p>
                <br/>
                <p>Unfortunately, they're not nearly as simple as Euler angles or rotation matrices, so let's go through a way to think about them.</p>
                <br></br>
                <p>First, let's start by recalling that we can rotate any vector in the complex plane by <InlineMath>{"\\theta"}</InlineMath> if we multiply it on the right side by <InlineMath>{"e^{i\\theta}"}</InlineMath>.</p>
                <img src = "quaternion_1.png" className = 'h-[300px]'></img>
                <p className = 'text-center'><i>"A rotation in 2-D using method seems to be pretty solid, right? What if there was something like this in 3-D" - Sir William Quaternion or something</i></p>
                <br/>
                <p className = 'w-full'>And, with this thought, quaternions were created.</p>
                <hr className = 'border-2 w-full'/>
                <p>This next section is a more mathematically intensive (though very bearable) section. Skip ahead at your leisure.</p>
                <br/>
                <p>To make them act like complex numbers, a quaternion <InlineMath>{"q = <w, x, y, z>"}</InlineMath> is equivalent to <InlineMath>{"w + x\\hat{i} + y\\hat{j} + z\\hat{k}"}</InlineMath>, where <InlineMath>{"\\hat{i}, \\hat{j}, \\hat{k}"}</InlineMath> are supposed to resemble something like complex numbers in 3-D space.</p>
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
                <p className = 'w-full text-center'><InlineMath>{"q = \\text{cos}(\\frac{\\theta}{2}) + \\text{sin}(\\frac{\\theta}{2})\\mathbf{u}, |q| = 1"}</InlineMath></p>
                <p className = 'w-full text-center'>where <InlineMath>{"\\mathbf{u} = (u_x, u_y, u_z)"}</InlineMath> is the vector-defined axis that we are rotating about</p>
                <p className = 'w-full'>and we define a vector-quaternion <InlineMath>{"\\mathbf{v} = (v_x, v_y , v_z) = 0 + v_x\\hat{i} + v_y\\hat{j} + v_z\\hat{k}, |v| \\in \\mathbb{R}"}</InlineMath></p>
                <p className = 'w-full'>Then, by applying the formula</p>
                <p className = 'w-full text-center'><InlineMath>{"q\\mathbf{v}q^{-1}"}</InlineMath></p>
                <p className = 'w-full'>we can rotate <InlineMath>{"\\mathbf{v} \\text{ by } \\theta"}</InlineMath> radians/degrees counterclockwise!</p>
                <br/>
                <p className = 'w-full'>Quaternions, as it turns out, are the smallest well-defined rotations in 3-D space; in other words, for any given rotation, there exists only a finite (2) amount of quaternions that encode it. For that reason, modern ADCS applications often use quaternions!</p>
                <br/>
                <p className = 'w-full text-center'><i>You've reached the end! Congrats :)</i></p>
            </div>
        </InfoDropdown>
    </div>)
}

export default Rotations