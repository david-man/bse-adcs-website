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

sqrt2 = math.sqrt(2)
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-1.1, 1.1)
ax.set_ylim(-1.1, 1.1)
ax.set_xlabel(r'$\mathbb{R}$', fontsize=16)
ax.set_ylabel(r'$\mathbb{C}$', fontsize=16)

i = Line2D([0, 1], [0, 0], linewidth=1, linestyle = "-", color="blue")
neg_i = Line2D([0, -1], [0,0], linewidth=1, linestyle = "-", color="blue")
j = Line2D([0,0], [0, 1], linewidth=1, linestyle = "-", color="green")
neg_j = Line2D([0,0], [0, -1], linewidth=1, linestyle = "-", color="green")
k = Line2D([0, sqrt2/2], [0, sqrt2/2], linewidth=1, linestyle = "--", color="red")
neg_k = Line2D([0,-sqrt2/2], [0,-sqrt2/2], linewidth=1, linestyle = "--", color="red")
ax.add_line(i)
ax.add_line(j)
ax.add_line(k)
ax.add_line(neg_i)
ax.add_line(neg_j)
ax.add_line(neg_k)
ax.annotate(r"$\hat{k}$", (math.sqrt(2)/2, math.sqrt(2)/2), fontsize=16)
ax.annotate(r"$\hat{j}$", (0, 1.1), fontsize=16)
ax.annotate(r"$\hat{i}$", (1.1,0), fontsize=16)

plt.savefig('public/ijk.png')