import { GithubOutlined } from '@ant-design/icons'

const SourceCodeLink = ({ className = '' }: { className?: string }) => (
  <>
    <div className={`source-code-link ${className}`}>
      <a
        href="https://github.com/bronsonavila/rainbow-dance-party/"
        rel="noreferrer"
        target="_blank"
      >
        <GithubOutlined />
        &nbsp;&nbsp;Source Code
      </a>
    </div>

    <style jsx>{`
      .source-code-link {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-end;
        margin: 0 0 1rem 1rem;
      }

      @media (min-width: 768px) {
        .source-code-link {
          flex: 0;
          margin: 1.25rem 0 0;
        }

        .source-code-link.mobile-only {
          display: none;
        }
      }
    `}</style>
  </>
)

export default SourceCodeLink
