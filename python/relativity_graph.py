import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1.inset_locator import inset_axes
import matplotlib.patches as patches


c = 3e8
m = 100.0 

v = np.linspace(0, 0.995 * c, 500)
KE_classical = 0.5 * m * v**2
gamma = 1 / np.sqrt(1 - (v**2 / c**2))
KE_relativistic = (gamma - 1) * m * c**2


fig, ax = plt.subplots(figsize=(8, 6))

ax.plot(v / c, KE_classical, label="Classical KE")
ax.plot(v / c, KE_relativistic, label="Relativistic KE")
ax.axvline(x=1, color='red', linestyle='--', label='Speed = c')

sub_ax = inset_axes(
    parent_axes=ax,
    width="40%",
    height="40%",
    loc='upper left',
    bbox_to_anchor=(0.15, -0.25, 1, 1),  # increase first value for more left padding
    bbox_transform=ax.transAxes,
    borderpad=0
)

v = np.linspace(0, 0.2 * c, 500)
KE_classical = 0.5 * m * v**2
gamma = 1 / np.sqrt(1 - (v**2 / c**2))
KE_relativistic = (gamma - 1) * m * c**2

sub_ax.plot(v / c, KE_classical, label="Classical KE")
sub_ax.plot(v / c, KE_relativistic, label="Relativistic KE")
sub_ax.set_xticks([])
sub_ax.set_yticks([])

ax.set_xlabel("Speed (fraction of c)", fontsize=15)
ax.set_ylabel("Kinetic Energy (Joules)", fontsize=15)
ax.set_title("Classical vs Relativistic Kinetic Energy", fontsize=18)
ax.legend(loc='upper left', bbox_to_anchor=(0.02, 0.98))

# Define rectangle (x_start, y_start, width, height)
rect = patches.Rectangle(
    (0, -0.2e19), 
    0.2,
    0.5e19,
    linewidth=1.5,
    edgecolor='black',
    linestyle=':',
    facecolor='none'
)

ax.add_patch(rect)

ax.plot([0, 0.11], [0.3e19, 6.2e19], color='black', linestyle=':', linewidth=1.5)
ax.plot([0.2, 0.55], [-0.2e19, 2.55e19], color='black', linestyle=':', linewidth=1.5)

plt.tight_layout()
plt.show()