def key_scheduling_algorithm(key):
    key_length = len(key)
    state = list(range(256))
    j = 0
    for i in range(256):
        j = (j + state[i] + key[i % key_length]) % 256
        state[i], state[j] = state[j], state[i]
    return state

def pseudo_random_generation_algorithm(state, n):
    i = 0
    j = 0
    key_stream = []
    for _ in range(n):
        i = (i + 1) % 256
        j = (j + state[i]) % 256
        state[i], state[j] = state[j], state[i]
        k = state[(state[i] + state[j]) % 256]
        key_stream.append(k)
    return key_stream

def rc4_encrypt(plaintext, key):
    key = [int(key[i:i + 8], 2) for i in range(0, len(key), 8)]
    plaintext = [int(plaintext[i:i + 8], 2) for i in range(0, len(plaintext), 8)]
    state = key_scheduling_algorithm(key)
    keystream = pseudo_random_generation_algorithm(state, len(plaintext))
    ciphertext = [(p ^ k) for p, k in zip(plaintext, keystream)]
    return ''.join(f'{byte:08b}' for byte in ciphertext)

plaintext = '00001100'
key = '00000110'
ciphertext = rc4_encrypt(plaintext, key)

print("Plaintext:", plaintext)
print("Key:", key)
print("Ciphertext:", ciphertext)
