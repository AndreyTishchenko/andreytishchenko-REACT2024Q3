import '@testing-library/jest-dom/vitest'
import getAPIresults from '../../src/API/api'
describe('group', () => {
    it('should', () => {
        expect(getAPIresults('saFDSAD', 1)).to.rejects
        expect(getAPIresults('a', 1)).to.resolves
    })
})
