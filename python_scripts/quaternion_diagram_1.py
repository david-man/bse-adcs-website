import matplotlib.pyplot as plt
from matplotlib.patches import *
from matplotlib.lines import *
import math

plt.rcParams['text.usetex'] = True
plt.rcParams['text.latex.preamble'] = r'\usepackage{amssymb}'

def get_angle_plot(line1, line2, origin = [0,0]):

    l1xy = line1.get_xydata()

    # Angle between line1 and x-axis using atan2 for proper quadrant handling
    angle1 = math.degrees(math.atan2(l1xy[1][1] - l1xy[0][1], l1xy[1][0] - l1xy[0][0]))
    if angle1 < 0:
        angle1 += 360  # Convert to 0-360 range

    l2xy = line2.get_xydata()

    # Angle between line2 and x-axis using atan2 for proper quadrant handling
    angle2 = math.degrees(math.atan2(l2xy[1][1] - l2xy[0][1], l2xy[1][0] - l2xy[0][0]))
    if angle2 < 0:
        angle2 += 360  # Convert to 0-360 range

    theta1 = min(angle1, angle2)
    theta2 = max(angle1, angle2)

    return Arc(origin, 0.3, 0.3, angle=0, theta1=theta1, theta2=theta2, color='black', linewidth = 1, label = r"\theta")

fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-1.1, 1.1)
ax.set_ylim(-1.1, 1.1)
ax.set_xlabel(r'$\mathbb{R}$', fontsize=24)
ax.set_ylabel(r'$\mathbb{C}$', fontsize=24)

ax.plot([-1, 1], [0, 0], c = 'black', alpha = 0.5)
ax.plot([0,0], [-1, 1], c = 'black', alpha = 0.5)
line_1 = Line2D([0,math.sqrt(2)/2*0.95], [0, math.sqrt(2)/2*0.95], linewidth=1, linestyle = "-", color="green")
line_2 = Line2D([0,-math.sqrt(2)/2*0.95], [0,math.sqrt(2)/2*0.95], linewidth=1, linestyle = "-", color="blue")
ax.add_line(line_1)
ax.add_line(line_2)
angle_plot = get_angle_plot(line_1, line_2)
ax.add_patch(angle_plot)
ax.annotate(r"$\vec{v}$", (math.sqrt(2)/2, math.sqrt(2)/2), fontsize=24)
ax.annotate(r"$\vec{v}e^{i\theta}$", (-math.sqrt(2)/2, math.sqrt(2)/2), fontsize=24)
ax.annotate(r"$\theta$", (0, 0.2), fontsize=24)

plt.savefig('public/quaternion_1.png')