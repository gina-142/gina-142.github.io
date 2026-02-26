import numpy as np
import matplotlib.pyplot as plt

def f_s(r_s, R=1.0, sigma=10.0):
    return (np.tanh(sigma * (r_s + R)) - np.tanh(sigma * (r_s - R))) / (2 * np.tanh(sigma * R))

r_s = np.linspace(-3, 3, 500)

sigma_values = [1, 4, 16]

plt.figure(figsize=(8,5))
for sigma in sigma_values:
    plt.plot(r_s, f_s(r_s, R=1.0, sigma=sigma), label=f'σ = {sigma}')

plt.title("Alcubierre Warp Bubble Shape Function " + r'$f(r_s)$')
plt.xlabel(r'$r_s$' + " (Distance from bubble center)")
plt.ylabel(r'$f(r_s)$')
plt.ylim(-0.1, 1.1)
plt.legend()
plt.show()