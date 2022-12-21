# Ethereum DEX

This is my repository for the project as part of the course Ethereum Smart Contract Programming 201 at Moralis Academy.

The project is a decentralized Exchange built using Truffle and Openzeppelin.
It consists of a wallet contract and a dex contract which inherits from the wallet.
The token contract is there for testing.

All test files are also included in this repository.

In the dex you can do market orders and limit orders.
The order book is sorted with a bubble sort algorithm which compares two values inside of the order book array and orders them depending on the side of the orderbook. 
After the limit orders are filled by market orders the orderbooks get updated in the market order function.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (Testing)

## Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
